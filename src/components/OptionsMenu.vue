<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <!-- MENU REGISTROS -->
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
            :active="link === '/api/now'"
            @click="link = '/api/now'"
            active-class="my-menu-link"
            to="/api/now"
          >
            <q-item-section avatar><q-icon name="update" /></q-item-section>
            <q-item-section>En este momento...</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === '/last'"
            @click="link = router.currentRoute._rawValue.path"
            active-class="my-menu-link"
            to="/last"
          >
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>

            <q-item-section>Últimas tareas finalizadas</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === '/api/byuser'"
            @click="link = '/api/byuser'"
            active-class="my-menu-link"
            to="/api/byuser"
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
            @click="link = router.currentRoute._rawValue.path"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>

            <q-item-section>Añadir fichaje</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <!-- MENU USUARIOS -->
      <q-expansion-item
        icon="perm_identity"
        label="Usuarios"
        @show="show('users')"
        @hide="hide('users')"
        :header-class="
          showhide.includes('users') ? 'bg-primary text-white' : ''
        "
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- MENU CALENDARIO -->
      <q-expansion-item
        @show="show('calendar')"
        @hide="hide('calendar')"
        :header-class="
          showhide.includes('calendar') ? 'bg-primary text-white' : ''
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

      <!-- MENU AJUSTES -->
      <q-expansion-item
        @show="show('settings')"
        @hide="hide('settings')"
        :header-class="
          showhide.includes('settings') ? 'bg-primary text-white' : ''
        "
        icon="settings"
        label="Ajustes"
      >
        <q-list bordered padding dense class="bg-grey">
          <!-- AJUSTES - CENTROS -->
          <q-item
            clickable
            v-ripple
            :active="link === '/api/workplaces'"
            @click="link = '/api/workplaces'"
            active-class="my-menu-link"
            to="/api/workplaces"
          >
            <q-item-section avatar><q-icon name="warehouse" /></q-item-section>
            <q-item-section>Centros de trabajo</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :active="link === '/api/test'"
            @click="link = '/api/test'"
            active-class="my-menu-link"
            to="/api/test"
          >
            <q-item-section avatar><q-icon name="test" /></q-item-section>
            <q-item-section>test</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    let showhide = ref(["records"]);
    function show(evt) {
      this.showhide.push(evt);
    }
    function hide(evt) {
      this.showhide = this.showhide.filter((item) => item !== evt);
    }
    return {
      link: ref("/api/now"),
      show,
      hide,
      showhide,
      router,
    };
  },
};
</script>
<style lang="scss">
.my-menu-link {
  color: white;
  background: $accent;
}
</style>
