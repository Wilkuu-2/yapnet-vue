import { Back, ChatSent, Hello, RecapHead, YN_Message } from "./yapnet-protocol"
import { isYN_Message } from "./yapnet-protocol.guard"
import { Ref, ref } from "vue";

type Username = string; 
type Token    = string; 


interface ConnectionConfig {
  address: string
  uname_or_uuid: Username | Token  
  is_back: boolean
} 

type Player = {
  username: string 
  token: string
} 

type RecapState = { 
  head: RecapHead, 
  current_seq: number,
}

declare interface WSConnection {
  ws: WebSocket| undefined 
  sendBuffer: Array<YN_Message> // TODO:  Performance: Ring buffer
  onMessage: ((this: WSConnection, message: YN_Message) => any) | null;
  onDisconnect: ((this: WSConnection)=> any) | null; 
  onConnect: ((this: WSConnection)=> any) | null;
  sendMessage(this: WSConnection, message: YN_Message): void;
  connect(this: WSConnection, cfg: ConnectionConfig): void;
  disconnect(this: WSConnection): void;
} 

declare interface Client {
  connection: WSConnection, 
  connectionConfig: ConnectionConfig | undefined
  messages: YN_Message[],
  chats: Ref<Map<string, Array<ChatSent>>>,
  playerdata?: Player,
  recapState?: RecapState, 
  handleMessage(this: Client, message: YN_Message): void
  sendMessage(this: Client, message: YN_Message): void 
  onconnection?: ((this: Client, isConnected: boolean) => any);
  onsetup?: ((this: Client) => any)
  onplayer?: ((this: Client, username: string, isConnected: boolean) => any)

} 

function WSConnect(this: WSConnection, cfg: ConnectionConfig) {
  if (this.ws !== undefined) { 
    this.disconnect()
  } 
  
  this.ws = new WebSocket(cfg.address)
  // -- Handlers 
  // Login 
  this.ws.onopen = () => {  
    if (this.ws !== undefined) { 
      var packet: Hello | Back;
      if (cfg.is_back) {
        packet = {
          seq: 0, 
          msg_type: "back", 
          data: {token: cfg.uname_or_uuid}
        };
      } else {
        packet = {
          seq: 0, 
          msg_type: "helo", 
          data: {username: cfg.uname_or_uuid} 
        } 
      }  
      this.ws.send(JSON.stringify(packet))
    }
  }
  this.ws.onmessage = (ev) => {
    if ( this.onMessage !== undefined) { this.onMessage!(JSON.parse(ev.data) as YN_Message);}
  }
  // Server disconnecting 
  this.ws.onclose = () => {
    this.disconnect() 
    // TODO: Maybe reconnect? 
    
  }
} 


function WSDisconnect(this: WSConnection) {
  if (this.ws === undefined) {
    return 
  } 

  this.ws.close();
  this.ws = undefined; 
} 

const _connection: WSConnection = {
  ws: undefined,  
  sendBuffer: Array<YN_Message>(0),
  onMessage: null,  
  onDisconnect: null,
  onConnect: null, 
  sendMessage: function (this, message: YN_Message) {
    this.sendBuffer.push(message)
    if(this.ws !== undefined) { 
      // Empty the buffer, might move it to a worker 
      while (this.sendBuffer.length > 0) {
        let packet = this.sendBuffer.shift();
        if (packet !== undefined) {
          this.ws.send(JSON.stringify(packet)) 
        }
      }
    }
  },
  connect: WSConnect, 
  disconnect: WSDisconnect, 
} 


const _client: Client = {
  connection: _connection, 
  messages: Array<YN_Message>(0), 
  chats: ref<Map<string, Array<ChatSent>>>( new Map<string, Array<ChatSent>>),
  connectionConfig: undefined, 
  playerdata: undefined, 
  recapState: undefined,
  handleMessage: HandleMessage,  
  sendMessage: SendMessage,
  onconnection: undefined, 
  onsetup: undefined, 
  onplayer: undefined,
} 


_connection.onConnect = () => {
  if ( _client.onconnection !== undefined) { _client.onconnection!(true);}
} 
_connection.onDisconnect = () => {
  if ( _client.onconnection !== undefined) { _client.onconnection!(false);}
} 
_connection.onMessage = (message: YN_Message) => { _client.handleMessage(message) }

function SendMessage(this: Client, message: YN_Message) {
  this.connection.sendMessage(message)
} 
function HandleMessage(this:  Client, message: YN_Message) {
  if(!isYN_Message(message)) {
    console.error(`Invalid message ${JSON.stringify(message)}`)
    return
  }

  console.log(`Handling: ${JSON.stringify(message)} `)

  switch (message.msg_type) {
    case "plrj":
      if ( this.onplayer !== undefined) { this.onplayer!(message.data.username, true);} 
      this.messages.push(message)
      break;
    case "welc":
      this.playerdata = {
        username: message.data.username,
        token: message.data.token,
      }
      if ( this.onconnection !== undefined ) { this.onconnection!(true)}
      break;
    case "plrl":
      if ( this.onplayer !== undefined) { this.onplayer!(message.data.username, true);} 
      this.messages.push(message)
      break;
    case "chat":
      let chat = this.chats.value.get(message.data.chat_target)
      if (chat === undefined) {
        let chat2 = Array<ChatSent>() ;
        this.chats.value.set(message.data.chat_target, chat2);
        chat2.push(message)
      } else {
        chat.push(message)
      }
      this.messages.push(message)
      break;
    case "err":
      console.error(`[Server] Error: ${message.data.info}`) 
      break;
    case "rech":
      this.recapState = {
        current_seq: 0, 
        head: message,
      } 
      break;
    case "recx":
      if (this.recapState === undefined){
        console.error("Recieved recap tail before head");
        break;         
      }
      
      message.data.msgs.forEach(msg => {
        if(msg.seq < this.recapState!.current_seq || msg.seq < message.data.start){
          console.error("Recieved out of order seq")
          return; // Does this return  
        }

        this.handleMessage(msg); // WARNING: Recursion
        this.recapState!.current_seq = msg.seq
      });
       
      break;
    case "stup":
      message.data.chats.forEach(chat => {
        if(!this.chats.value.has(chat.name))
        { this.chats.value.set(chat.name, [])
        }
      }); 
      if(this.onsetup !== undefined) { this.onsetup()} 
    break; 
    case "helo":
    case "back":
    case "chas":
      console.error("Client message recieved");
      
  } 
  
}  


export default {
  login_or_register(cfg: ConnectionConfig, onFinish?: (success: boolean) => any ){
    _client.connectionConfig = cfg;
    _client.connection.connect(cfg);
    if(onFinish !== undefined) {
      _client.onconnection = onFinish;
    } 
  },


  getClient(): Client {
    return _client
  },
  sendMessage(message: YN_Message) {
  _client.sendMessage(message) 
  },
}

