<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th class="acciones">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ formatoPrecio(p.precio) }}</td>
          <td class="acciones">
            <router-link :to="`/productos/${p.id}`"><button>Editar</button></router-link>
            <button @click="$emit('eliminar', p.id)">Eliminar</button>
            <button @click="$emit('agregar', p)">Agregar al carrito</button>
          </td>
        </tr>
        <tr v-if="productos.length === 0">
          <td colspan="4">No hay productos.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
defineProps({
  productos: { type: Array, required: true }
})
const emit = defineEmits(['eliminar','agregar'])

function formatoPrecio(n) {
  return `$ ${Number(n).toFixed(2)}`
}
</script>

<style scoped>
.table { width:100%; border-collapse:collapse; margin-top:12px; }
.table th, .table td { padding:8px 10px; border:1px solid #ddd; text-align:left; }
.acciones button { margin-right:6px; }
</style>
