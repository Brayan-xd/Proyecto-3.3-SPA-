<template>
  <div class="container">
    <h2>Carrito</h2>
    <div v-if="carrito.length === 0" class="vacio">
      <p>El carrito está vacío.</p>
      <router-link to="/productos" class="btn-ir">Ir a productos</router-link>
    </div>

    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carrito" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ formatoPrecio(item.precio) }}</td>
            <td>{{ formatoPrecio(item.precio * item.cantidad) }}</td>
            <td>
              <button @click="eliminar(item.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p><strong>Artículos:</strong> {{ totalArticulos }}</p>
      <p><strong>Total:</strong> {{ formatoPrecio(totalPrecio) }}</p>

      <button @click="vaciar" class="danger">Vaciar carrito</button>
    </div>
    <DialogoConf ref="dialogoConf" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCarritoStore } from '../stores/useCarritoStore'
import DialogoConf from '../components/DialogoConf.vue'

const carritoStore = useCarritoStore()
const carrito = carritoStore.carrito
const totalArticulos = computed(() => carritoStore.totalArticulos)
const totalPrecio = computed(() => carritoStore.totalPrecio)
const dialogoConf = ref(null)

async function eliminar(id) {
  const confirmado = await dialogoConf.value.abrir('¿Quitar producto del carrito?')
  if (confirmado) carritoStore.eliminarDelCarrito(id)
}

async function vaciar() {
  const confirmado = await dialogoConf.value.abrir('¿Vaciar todo el carrito?')
  if (confirmado) carritoStore.vaciarCarrito()
}

function formatoPrecio(n) {
  return `$ ${Number(n).toFixed(2)}`
}
</script>