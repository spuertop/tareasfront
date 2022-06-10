<template>
  {{ title }}
  <button @click="$emit('update:modelValue', 'v')">El boton</button>
  <input @keyup="$emit('update:filter', filtro)" v-model="filtro" type="text" />
  <br />
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  title: String,
});
let filtro = ref("");
</script>
