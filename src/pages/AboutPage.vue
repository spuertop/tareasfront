<template>
  <h1 class="q-pa-md">About</h1>
  <div class="q-pa-md" style="max-width: 350px">
    <q-input v-model="text" label="Nombre" />
    <p>{{text}}</p>
    <q-list bordered separator>
      <q-item bordered clickable v-for="item in filterList"
          :key="item.n"
          v-bind="item"
          @click="prompt = true; name = item.n">
        <q-item-section> {{item.n}} </q-item-section>
      </q-item>
    </q-list>
  </div>
  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hola {{name}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Enter" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

const prompt = ref(false)
const address = ref('')
const name = ref('')

const text = ref('')
const lista = ref([
  {
    n: 'Ana'
  },
  {
    n: 'Mario'
  },
  {
    n: 'Joel'
  },
  {
    n: 'Eva'
  },
  {
    n: 'Joder'
  }
])
const filterList = computed(() => {
  return lista.value.filter((item) => {
    return (item.n).toLowerCase().includes(text.value.toLowerCase())
  })
})

</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background: #f2c037;
}
</style>
