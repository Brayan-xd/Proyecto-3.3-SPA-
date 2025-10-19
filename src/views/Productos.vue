<template>
  <div class="container">
    <h2>Productos</h2>

    <input v-model="buscar" placeholder="Buscar por nombre..." />

    <product-list
      :productos="productosFiltrados"
      @eliminar="confirmarEliminar"
      @agregar="confirmarAgregar"
    />

    <!-- 👇 Componente de diálogo -->
    <dialogoconf ref="dialogoConfirmacion" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductList from '../components/ProductList.vue'
import dialogoconf from '../components/dialogoconf.vue'
import { useProductoStore } from '../stores/useProductoStore'
import { useCarritoStore } from '../stores/useCarritoStore'

const productoStore = useProductoStore()
const carritoStore = useCarritoStore()

const buscar = ref('')
const dialogoConfirmacion = ref(null)

const productos = computed(() => productoStore.state.productos)
const productosFiltrados = computed(() => {
  const q = buscar.value.trim().toLowerCase()
  if (!q) return productos.value
  return productos.value.filter(p => p.nombre.toLowerCase().includes(q))
})

async function confirmarEliminar(id) {
  const confirmado = await dialogoConfirmacion.value.abrir('¿Eliminar producto?')
  if (confirmado) productoStore.eliminarProducto(id)
}

async function confirmarAgregar(producto) {
  const confirmado = await dialogoConfirmacion.value.abrir(`¿Agregar "${producto.nombre}" al carrito?`)
  if (confirmado) carritoStore.agregarAlCarrito(producto)
}
</script>

<style scoped>
.container { padding:20px; }
input { padding:8px; width:100%; max-width:320px; margin-bottom:12px; }
</style>
