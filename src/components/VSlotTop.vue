<template>
  <q-icon :name="icon" class="text-h5" />
  <span class="text-h5">{{ title }}</span>
  <q-space />
  <q-input
    dense
    placeholder="Buscar..."
    @keyup="$emit('update:filter', filtro)"
    v-model="filtro"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  title: String,
  icon: String,
});
let filtro = ref("");
</script>
