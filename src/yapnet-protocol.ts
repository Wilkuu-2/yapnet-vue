
export type YN_Message = PlayerJoined | Hello | Back | Welcome | PlayerJoined | PlayerLeft | ChatSend | ChatSent | YNError |  RecapHead | RecapTail; 

// Player movement protocol
/// Client: First time join
export type Hello = { 
  seq: number; 
  msg_type: "helo";
  data: { username: string };
}
/// Client: Reconnect
export type Back = { 
  seq: number;   
  msg_type: "back";
  data: { token: string };
}
/// Server: Accept player
export type Welcome = { 
  seq: number;   
  msg_type: "welc";
  data: { 
    username: string;
    token: string;
  };
}
/// Server: Someone joined
export type PlayerJoined = { 
  seq: number;   
  msg_type: "plrj";
  data: { username: string };
}
/// Server: Someone left
export type PlayerLeft = { 
  seq: number;   
  msg_type: "plrl";
  data: { username: string };
}

// Chat
//// Client: Say this in this chat
export type ChatSend = { 
  seq: number;   
  msg_type: "chas";
  data: {
    chat_target: string;
    chat_content: string;
  };
}
/// Server: This client said this in this chat
export type ChatSent = { 
  seq: number;
  msg_type: "chat";
  data: {
    chat_sender: string; 
    chat_target: string;
    chat_content: string;
  };
}
/// Server+Client; this went wrong
export type YNError = { 
  seq: number;
  msg_type: "err";
  data: {
    kind: string;
    info: string; 
    details: string;
  };
}

/// Sync
/// Server: This is how much happened before you joined
export type RecapHead = { 
  seq: number;
  msg_type: "rech";
  data: { count: number; chunk_sz: number };
}
/// Server: This is what happened before you joined
export type RecapTail = { 
  seq: number;
  msg_type: "recx";
  data: { start: number; msgs: Array<YN_Message> };
}
