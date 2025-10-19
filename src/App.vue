<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
/* import global styles */
main { padding: 20px; }
</style>
