<template>
  <div class="container">
    <h2>Crear Producto</h2>
    <form @submit.prevent="crear">
      <label>Nombre</label>
      <input v-model="form.nombre" required />

      <label>Descripción</label>
      <input v-model="form.descripcion" />

      <label>Precio</label>
      <input type="number" v-model.number="form.precio" step="0.01" required />

      <button type="submit">Crear</button>
      <router-link to="/productos"><button type="button">Cancelar</button></router-link>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useProductoStore } from '../stores/useProductoStore'
import { useRouter } from 'vue-router'

const productoStore = useProductoStore()
const router = useRouter()

const form = reactive({ nombre: '', descripcion: '', precio: 0 })

function crear() {
  productoStore.crearProducto({ nombre: form.nombre, descripcion: form.descripcion, precio: Number(form.precio) })
  router.push('/productos')
}
</script>

<style scoped>
.container { padding:20px; }
label { display:block; margin-top:10px }
input { padding:8px; width:100%; max-width:400px; }
button { margin-top:12px; margin-right:6px; }
</style>
