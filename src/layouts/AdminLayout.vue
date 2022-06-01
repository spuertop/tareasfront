<template>
  <!-- <q-layout view="hHh lpR fFf"> -->
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="glossy">
        <q-btn
          v-if="loginStore.token"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/tareasicon.png" />
          </q-avatar>
          Tareas
        </q-toolbar-title>
        <div v-if="loginStore.activeUser">
          <p v-if="loginStore.user.name" class="absolute-center">
            Hola {{ loginStore.user.name }}
          </p>
          <q-btn label="Salir" @click="loginStore.logOut" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="loginStore.activeUser"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
    >
      <options-menu></options-menu>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useLoginStore } from "src/stores/login-store";
import OptionsMenu from "src/components/OptionsMenu.vue";

export default {
  setup() {
    const loginStore = useLoginStore();
    loginStore.getUserFromStorage();
    const leftDrawerOpen = ref(false);
    return {
      loginStore,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  components: { OptionsMenu },
};
</script>
