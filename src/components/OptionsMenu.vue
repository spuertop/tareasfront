<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-expansion-item
        bordered
        :default-opened="true"
        icon="menu_book"
        label="Registros"
        @show="show('records')"
        @hide="hide('records')"
        :header-class="
          showhide.includes('records') ? 'bg-primary text-white' : ''
        "
      >
        <q-list bordered padding dense class="bg-grey">
          <q-item
            clickable
            v-ripple
            :active="link === 'now'"
            @click="link = 'now'"
            active-class="my-menu-link"
          >
            <q-item-section avatar><q-icon name="update" /></q-item-section>
            <q-item-section>En este momento...</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'last'"
            @click="link = 'last'"
            active-class="my-menu-link"
            to="/about"
          >
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>

            <q-item-section>Últimas tareas finalizadas</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'byuser'"
            @click="link = 'byuser'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="person_search" />
            </q-item-section>

            <q-item-section>Informe por usuario</q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item
            clickable
            v-ripple
            :active="link === 'addrecord'"
            @click="link = 'addrecord'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>

            <q-item-section>Añadir fichaje</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item
        icon="perm_identity"
        label="Usuarios"
        @show="show('users')"
        @hide="hide('users')"
        :header-class="
          showhide.includes('users') ? 'bg-primary text-white q-mt-md' : ''
        "
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        @show="show('calendar')"
        @hide="hide('calendar')"
        :header-class="
          showhide.includes('calendar') ? 'bg-primary text-white q-mt-md' : ''
        "
        icon="calendar_month"
        label="Calendario"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    let showhide = ref(["records"]);
    function show(evt) {
      this.showhide.push(evt);
    }
    function hide(evt) {
      this.showhide = this.showhide.filter((item) => item !== evt);
    }
    return {
      link: ref("registros"),
      show,
      hide,
      showhide,
    };
  },
};
</script>
<style lang="scss">
.my-menu-link {
  color: white;
  background: #ee8a38;
}
</style>
