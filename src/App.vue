<script setup lang="ts">
import Login from './components/Login.vue'
import MainWindow from './components/MainWindow.vue'
import yn_client from './yn_client.ts'

import { ref, computed } from 'vue'

let client = yn_client.getClient();

var isLoggedin = ref(false);

client.onconnection = (loggedin) => {
  isLoggedin.value = loggedin; 
} 
const currentView = computed( () => {
  return isLoggedin.value ? MainWindow : Login  
});

</script>

<template>
  <component :is="currentView" />
</template>
