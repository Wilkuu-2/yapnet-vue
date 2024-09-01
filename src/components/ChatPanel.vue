<script setup lang="ts">
import yn_client from '../yn_client';
import { ref, computed } from 'vue';

const client = yn_client.getClient();
const selector = ref("general");
const selectors = computed<Array<string>>(() => {
  return Array.from(client.chats.value.keys());
  
});
const current_chat = computed( () => {
  return client.chats.value.get(selector.value)
}); 
let chat     = ref('') 

function submit_chat(ev: SubmitEvent) {
    ev.preventDefault();
    client.sendMessage({
      seq: 0,
      msg_type: "chas", 
      data: {
        chat_target: selector.value,
        chat_content: chat.value,  
      }  
    });
    chat.value = ''; 
    console.log("Sent chat")
}; 

</script>

<template>
  <div id="mw-chatwindow">
    <div id="chatselector" >
      <label v-for="opt in selectors" class="chatoption" :for="opt">
        <input type="radio" :name="opt" :id="opt" :value="opt" v-model="selector"/>
        <div>{{opt}}</div>
      </label>
    </div>
    <ul id="chatcontent">
      <li  v-for="line in current_chat">
        {{line.data.chat_sender}}: {{line.data.chat_content}}
      </li>
    </ul>
  </div>

  <form @submit="submit_chat" id="mw-chatform"> 
    <input v-model="chat" type="text" name="chat"> 
  </form> 
</template>


<style lang="less">

@highlight:  mix(#242424, #FE51AE, 40);

#mw-chatwindow {
  grid-column: 1;
  grid-row: 2 / 4;
  display: grid;
  grid-template-rows: 1.2em auto;
}
#mw-chatform {
  grid-row: 4;
  grid-column: 1;
}  

#chatcontent { 
  overflow: scroll;
  max-height: calc(96vh - 5em - 7em - 4em);
}

#chatselector {
  display: flex; 
  flex-direction: row;
  flex-wrap: nowrap;
  overflow:scroll; 
  margin: -1.1em; 
  padding: 0em; 
  border-bottom: 5px #FE51AEFF solid;
  align-items: stretch;
} 

.chatoption:first-child > input + div{
  border-top-left-radius: 1rem;
} 

.chatoption:last-child > input + div {
  border-top-right-radius: 1rem;
  border-right: 5px transparent; 
  
}

.chatoption {
  display: flex;
  flex-grow: 1;
}

.chatoption > input {
  visibility: hidden;
  position: absolute;
}
.chatoption > input + div{ /* DIV STYLES */
  cursor:pointer;
  padding: 0.5em;
  padding-left: 0.8em;
  flex-grow: 1;
  z-index: -1;
  border-right: 5px #FE51AE solid;
  
}
.chatoption > input:checked + div { /* (RADIO CHECKED) DIV STYLES */
  background-color: @highlight;
}

</style>
