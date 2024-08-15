<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from './ActionPanel.vue';
import yn_client from '../yn_client.ts';

let client = yn_client.getClient();
let username = ref(client.playerdata!.username );
let uuid     = ref(client.playerdata!.token);
let chats    = ref([{chatname: "general", username: "wilkuu", content: "Test"}]);
let users    = ref([{name: 'wilkuu', online:true}]);
let chat     = ref('') 

client.onchat = (csent: ChatSent) => {
  chats.value.push({
    chatname: csent.data.chat_target,
    username: csent.data.chat_sender,
    content:  csent.data.chat_content,
  });  
  
  let chatwindow = document.getElementById("mw-chatwindow")
  chatwindow.scrollTop = chatwindow.scrollHeight

}  

function submit_chat(ev: SubmitEvent) {
    ev.preventDefault();
    client.sendMessage({
      seq: 0,
      msg_type: "chas", 
      data: {
        chat_target: "general",
        chat_content: chat.value,  
      }  
    });
    chat.value = ''; 
    console.log("Sent chat")
  }; 

</script>

<template>
  <section class="mw-grid"> 
    <div>
      <h2><abbr title="Click to copy token.">{{ username }}</abbr></h2>
    </div>
    <div>{{uuid}}</div>

    <div id="mw-chatwindow">
      <ul>
        <li v-for="chat in chats">
          [{{chat.chatname}}] {{chat.username}}: {{chat.content}}
        </li>
      </ul>
    </div>
    
    <div>
      <ul class="mw-users">
        <li v-for="user in users">
          <span>{{user.name}}</span>&nbsp;<span>{{user.online}}</span>
        </li>
      </ul>
    </div>

    <ActionPanel/>
    <form @submit="submit_chat" action="javascript:void(0);" class="mw-chatform"> 
      <input v-model="chat" type="text" name="chat"> 
    </form> 
    

  </section>
</template>

<style lang="less" scoped>
.mw-grid {
  height: 96vh;
  display: grid;
  grid-template-columns: auto 30em;
  grid-template-rows: 5em auto 7em 4em;
  grid-gap: 10px;
}

.mw-grid > * {
  padding: 1em;
  border: 5px #FE51AEFF solid;
  border-radius: 1rem;
} 

#mw-chatwindow {
  grid-row: 2 / 4;
  overflow: scroll; 
}
</style>
