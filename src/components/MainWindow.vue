<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from './ActionPanel.vue';
import ChatPanel from './ChatPanel.vue';
import yn_client from '../yn_client';

let client = yn_client.getClient();
let username = ref(client.playerdata!.username );
let uuid     = ref(client.playerdata!.token);
let users    = ref([{name: 'wilkuu', online:true}]);



</script>

<template>
  <section class="mw-grid"> 
    <div>
      <h2><abbr title="Click to copy token.">{{ username }}</abbr></h2>
    </div>
    <div>{{uuid}}</div>

    <ChatPanel/>

    <div>
      <ul class="mw-users">
        <li v-for="user in users">
          <span>{{user.name}}</span>&nbsp;<span>{{user.online}}</span>
        </li>
      </ul>
    </div>

    <ActionPanel/>
    

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
</style>
