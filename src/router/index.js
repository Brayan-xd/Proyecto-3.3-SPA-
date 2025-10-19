import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Productos from '../views/Productos.vue'
import CrearProducto from '../views/CrearProducto.vue'
import EditarProducto from '../views/EditarProducto.vue'
import Carrito from '../views/Carrito.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/productos', name: 'Productos', component: Productos },
  { path: '/productos/crear', name: 'CrearProducto', component: CrearProducto },
  { path: '/productos/:id', name: 'EditarProducto', component: EditarProducto, props: true },
  { path: '/carrito', name: 'Carrito', component: Carrito }
]

const router = createRouter({
  history: createWebHashHistory(), // <- hash mode para GitHub Pages
  routes
})

export default router
