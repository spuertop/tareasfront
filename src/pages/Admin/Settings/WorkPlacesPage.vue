<template>
  <q-page class="q-pa-md">
    <q-table
      class="my-sticky-table"
      bordered
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="settingsStore.workplaces"
      :filter="filter"
      row-key="id"
      v-model:selected="selected"
      selection="single"
      @row-dblclick="onRowDlbClick"
      @row-click="onRowClick"
      :loading="loading"
      dense
      :pagination="pagination"
    >
      <template v-slot:top>
        <v-slot-top
          title="Centros de trabajo"
          icon="warehouse"
          @update:filter="filter = $event"
        />
      </template>

      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.value"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            disable
          />
        </q-td>
      </template>
      <template v-slot:body-cell-customers="props">
        <q-td :props="props">
          <span v-for="item in props.value" :key="item.id">
            <q-chip>{{ item.name }}</q-chip>
          </span>
        </q-td>
      </template>
      <template v-slot:bottom>
        <div class="q-pa-sm q-gutter-sm">
          <q-btn
            round
            color="accent"
            icon="add"
            glossy
            @click="showDialogAdd"
          />
          <q-btn
            round
            color="accent"
            icon="edit"
            glossy
            @click="showDialogEdit"
            :disable="selected.length == 0"
          />
        </div>
        <q-space />
        <q-btn
          round
          color="negative"
          icon="delete"
          glossy
          @click="confirmDelete = true"
          :disable="selected.length == 0"
        />
      </template>
      <template v-slot:no-data>
        <div class="q-pa-sm q-gutter-sm">
          <p>No se han encontrado datos.</p>
        </div>
        <div class="q-pa-sm q-gutter-sm">
          <q-btn
            round
            color="accent"
            icon="add"
            glossy
            @click="showDialogAdd"
          />
          <q-btn
            round
            color="accent"
            icon="edit"
            glossy
            @click="showDialogEdit"
            :disable="selected.length == 0"
          />
        </div>
        <q-space />
        <q-btn
          round
          color="negative"
          icon="delete"
          glossy
          @click="confirmDelete = true"
          :disable="selected.length == 0"
        />
      </template>
    </q-table>
    <!-- DIALOG CONFIRM DELETE -->
    <q-dialog v-model="confirmDelete">
      <q-card style="min-width: 25vw" flat bordered>
        <q-item class="bg-accent text-white">
          <q-item-section avatar>
            <q-avatar icon="delete" color="negative" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">Eliminar</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            Vas a eliminar el centro
            <strong>{{ selected[0] ? selected[0].name : "" }}</strong
            >. <br />
            Esta acción no se puede deshacer.<br />
            ¿Seguro que lo quieres borrar?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="accent" v-close-popup />
          <q-btn
            label="Eliminar"
            color="primary"
            v-close-popup
            @click="deleteSelected"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- DIALOG EDIT -->
    <q-dialog v-model="dialogEdit">
      <q-card style="min-width: 25vw" flat bordered>
        <q-item class="bg-primary text-white">
          <q-item-section avatar>
            <q-avatar icon="edit" color="accent" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">Editar</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <q-form class="q-ma-sm" @submit.prevent="updateSelected">
            <q-input v-model="inputName" label="Nombre del centro" autofocus />
            <q-toggle
              v-model="inputActive"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :label="inputActive ? 'Centro activado' : 'Centro desactivado'"
            />
            <!-- Show customers of this workplace -->
            <br />
            <span
              v-if="selected[0].Customers && selected[0].Customers.length > 0"
              >Clientes asignados:</span
            >
            <div v-for="item in selected[0].Customers" :key="item.id">
              <q-chip>{{ item.name }}</q-chip>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="accent" v-close-popup />
          <q-btn
            label="Actualizar"
            color="primary"
            v-close-popup
            @click="updateSelected"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- DIALOG ADD -->
    <q-dialog v-model="dialogAdd">
      <q-card style="min-width: 25vw" flat bordered>
        <q-item class="bg-primary text-white">
          <q-item-section avatar>
            <q-avatar icon="add" color="accent" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">Nuevo</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <q-form class="q-ma-sm" @submit.prevent="saveNew">
            <q-input
              v-model="inputName"
              label="Nombre del centro"
              autofocus
              :rules="[
                (val) =>
                  (val && val.length > 4) ||
                  'No puede estar vacio, mín. 4 chars',
              ]"
            />
            <q-toggle
              v-model="inputActive"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :label="inputActive ? 'Centro activado' : 'Centro desactivado'"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="accent" v-close-popup />
          <q-btn
            label="Guardar"
            color="primary"
            v-close-popup
            @click="saveNew"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--     <pre>{{ selected }}</pre>
    <pre>{{ settingsStore.workplaces }}</pre> -->
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useSettingsStore } from "src/stores/settings-store";
import { useQuasar } from "quasar";
import VSlotTop from "src/components/VSlotTop.vue";

export default {
  setup() {
    const settingsStore = useSettingsStore();
    const $q = useQuasar();
    //Data
    const pagination = { sortBy: "name" };
    const columns = [
      {
        name: "name",
        label: "Centro de trabajo",
        field: (row) => row.name,
        required: true,
        align: "left",
        sortable: true,
      },
      {
        name: "active",
        label: "Activo",
        field: (row) => (row.deletedAt ? false : true),
        align: "left",
        sortable: true,
      },
      {
        name: "customers",
        label: "Clientes asignados",
        align: "left",
        field: (row) =>
          row.Customers.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          ),
      },
    ];
    //Table
    const filter = ref("");
    let loading = ref(true);
    settingsStore.getWorkPlaces();
    settingsStore.getCustomers();
    loading.value = false;
    //Form
    const selected = ref([]);
    const inputName = ref("");
    const inputActive = ref(false);
    //New
    const dialogAdd = ref(false);
    function showDialogAdd() {
      selected.value = [];
      dialogAdd.value = true;
      inputName.value = "";
      inputActive.value = false;
    }
    async function saveNew() {
      loading.value = true;
      dialogAdd.value = false;
      const res = await settingsStore.postWorkPlace({
        name: inputName.value,
        deletedAt: inputActive.value,
      });
      showRes(res);
      inputActive.value = false;
      inputName.value = "";
      loading.value = false;
    }
    //Updates
    const dialogEdit = ref(false);
    function showDialogEdit() {
      inputName.value = selected.value[0]?.name;
      inputActive.value = selected.value[0]?.deletedAt ? false : true;
      dialogEdit.value = true;
    }
    async function updateSelected() {
      loading.value = true;
      dialogEdit.value = false;
      await settingsStore.putWorkPlace({
        id: selected.value[0].id,
        name: inputName.value,
        deletedAt: inputActive.value,
      });
      selected.value = [];
      loading.value = false;
    }
    function onRowDlbClick(evt, row, index) {
      selected.value = [row];
      showDialogEdit();
    }
    function onRowClick(evt, row, index) {
      selected.value = [row];
    }
    //Delete
    const confirmDelete = ref(false);
    async function deleteSelected() {
      loading.value = true;
      await settingsStore.deleteWorkPlace(selected.value[0]);
      selected.value = [];
      loading.value = false;
    }
    function showRes(res) {
      if (res && res.status !== 200) {
        $q.notify({
          type: "negative",
          message: res,
          actions: [{ icon: "close", color: "white" }],
        });
      }
    }
    return {
      loading,
      columns,
      filter,
      selected,
      confirmDelete,
      dialogAdd,
      dialogEdit,
      deleteSelected,
      saveNew,
      updateSelected,
      onRowDlbClick,
      inputActive,
      pagination,
      inputName,
      showDialogAdd,
      showDialogEdit,
      settingsStore,
      onRowClick,
    };
  },
  components: { VSlotTop },
};
</script>

<style lang="scss"></style>
