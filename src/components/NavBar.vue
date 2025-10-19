<template>
  <nav class="nav">
    <router-link to="/" class="brand">Cafetería</router-link>
    <ul class="nav-links">
      <li><router-link to="/productos">Productos</router-link></li>
      <li><router-link to="/productos/crear">Crear</router-link></li>
      <li><router-link to="/carrito">Carrito <span v-if="totalArticulos">({{ totalArticulos }})</span></router-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useCarritoStore } from '../stores/useCarritoStore'

const carritoStore = useCarritoStore()
const totalArticulos = computed(() => carritoStore.totalArticulos)
</script>
