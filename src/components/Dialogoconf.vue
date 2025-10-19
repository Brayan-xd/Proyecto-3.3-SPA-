<template>
  <div v-if="visible" class="overlay">
    <div class="dialog">
      <h3>{{ mensaje }}</h3>
      <div class="buttons">
        <button @click="confirmar" class="btn-confirmar">Sí</button>
        <button @click="cancelar" class="btn-cancelar">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import '../styles.css' 
const visible = ref(false)
const mensaje = ref('')
let resolveFn

function abrir(msg) {
  mensaje.value = msg
  visible.value = true
  return new Promise((resolve) => {
    resolveFn = resolve
  })
}

function confirmar() {
  visible.value = false
  resolveFn(true)
}

function cancelar() {
  visible.value = false
  resolveFn(false)
}

defineExpose({ abrir })
</script>

