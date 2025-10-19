import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useProductoStore = defineStore('producto', () => {
  // state
  const state = reactive({
    productos: [
      { id: 1, nombre: 'Café Espresso', descripcion: '250g - tueste oscuro', precio: 45.00, imagen: '' },
      { id: 2, nombre: 'Café Latte', descripcion: '250g - suave', precio: 50.00, imagen: '' },
      { id: 3, nombre: 'Muffin de Vainilla', descripcion: 'Porción', precio: 25.00, imagen: '' },
      { id: 4, nombre: 'Panini', descripcion: 'Jamón y queso', precio: 70.00, imagen: '' },
      { id: 5, nombre: 'Té Verde', descripcion: '20 bolsitas', precio: 30.00, imagen: '' }
    ]
  })

  // actions
  function crearProducto(producto) {
    const nuevo = { ...producto, id: Date.now() }
    state.productos.push(nuevo)
  }

  function actualizarProducto(id, producto) {
    const idx = state.productos.findIndex(p => p.id === Number(id))
    if (idx !== -1) {
      state.productos[idx] = { ...state.productos[idx], ...producto, id: Number(id) }
    }
  }

  function eliminarProducto(id) {
    state.productos = state.productos.filter(p => p.id !== Number(id))
  }

  // getters (como funciones)
  function obtenerProductoPorId(id) {
    return state.productos.find(p => p.id === Number(id)) || null
  }

  return {
    state,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductoPorId
  }
})
