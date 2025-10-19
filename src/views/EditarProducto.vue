<template>
  <div class="container" v-if="producto">
    <h2>Editar Producto</h2>
    <form @submit.prevent="guardar">
      <label>Nombre</label>
      <input v-model="form.nombre" required />

      <label>Descripción</label>
      <input v-model="form.descripcion" />

      <label>Precio</label>
      <input type="number" v-model.number="form.precio" step="0.01" required />

      <button type="submit">Guardar</button>
      <router-link to="/productos"><button type="button">Volver</button></router-link>
    </form>
  </div>

  <div v-else class="container">
    <p>Producto no encontrado.</p>
    <router-link to="/productos">Volver a productos</router-link>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue'
import { useProductoStore } from '../stores/useProductoStore'
import { useRouter, useRoute } from 'vue-router'

const productoStore = useProductoStore()
const router = useRouter()
const route = useRoute()
const id = route.params.id

const producto = productoStore.obtenerProductoPorId(id)
const form = reactive({
  nombre: producto ? producto.nombre : '',
  descripcion: producto ? producto.descripcion : '',
  precio: producto ? producto.precio : 0
})

function guardar() {
  productoStore.actualizarProducto(id, { nombre: form.nombre, descripcion: form.descripcion, precio: Number(form.precio) })
  router.push('/productos')
}
</script>

<style scoped>
.container { padding:20px; }
label { display:block; margin-top:10px }
input { padding:8px; width:100%; max-width:400px; }
button { margin-top:12px; margin-right:6px; }
</style>
