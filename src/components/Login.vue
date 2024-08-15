<script setup lang="ts">
import { ref } from 'vue';
import yn_client from '../yn_client.ts';
import { ChatSent} from '../yn-protocol.ts';

let client = yn_client.getClient()

let username = ref('')
let token    = ref('')
let address    = ref('ws://localhost:8080/ws')

function login_uname() {
   yn_client.login_or_register({address: address.value, uname_or_uuid: username.value, is_back: false});
} 
function login_token() {
   yn_client.login_or_register({address: address.value, uname_or_uuid: token.value, is_back: true});

}
</script>

<template>
  <h1>Yapnet: Login</h1>
  <div class="login-window">
    <input v-model="address" type="text" name="username" placeholder="Address">
    <form @submit="login_uname" action="javascript:void();">
      <label for="username">Join as a new player</label><br>
      <input v-model="username" type="text" name="username" placeholder="Username">
    </form>
    <span>OR</span>
    <form @submit="login_token" action="javascript:void();">
      <label for="token">Enter a token to rejoin</label><br>
      <input v-model="token" type="password" name="token" placeholder="Token">
    </form>
  </div>
</template>

<style lang="less">
:has(.login-window) {
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: -5em;
} 
</style>
<style lang="less" scoped>
.login-window {
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 30vw;
  max-width: 90vw;

  min-height: 10wv;
  max-height: 50vh;

  padding: 1em;
  border: 5px #FE51AEFF solid;
  border-radius: 1rem;

  font-size: 18pt;
}

span { 
  font-size: 20pt; 
}

input {
  font-size: 19pt;
} 

</style>
