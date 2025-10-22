import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'cafeteria_carrito'

export const useCarritoStore = defineStore('carrito', () => {
  const carrito = ref([]) 
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) carrito.value = JSON.parse(raw)
  } catch (e) {
    console.warn('No se pudo leer carrito de localStorage', e)
  }

  function persistir() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito.value))
    } catch (e) {
      console.warn('No se pudo persistir carrito', e)
    }
  }

  function agregarAlCarrito(producto) {
    const existente = carrito.value.find(item => item.id === Number(producto.id))
    if (existente) {
      existente.cantidad += 1
    } else {
      carrito.value.push({
        id: Number(producto.id),
        nombre: producto.nombre,
        precio: Number(producto.precio),
        cantidad: 1
      })
    }
    persistir()
  }

  function eliminarDelCarrito(id) {
    carrito.value = carrito.value.filter(item => item.id !== Number(id))
    persistir()
  }

  function vaciarCarrito() {
    carrito.value = []
    persistir()
  }

  const totalArticulos = computed(() => carrito.value.reduce((s, it) => s + it.cantidad, 0))
  const totalPrecio = computed(() => carrito.value.reduce((s, it) => s + it.precio * it.cantidad, 0))

  return {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    totalArticulos,
    totalPrecio
  }
})
