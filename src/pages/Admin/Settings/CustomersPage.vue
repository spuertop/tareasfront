<template>
  <q-page class="q-pa-md">
    <q-table
      class="my-sticky-table"
      bordered
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="settingsStore.customers"
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
      <!--TABLE HEADER -->
      <template v-slot:top>
        <q-icon name="business_center" class="text-h5" />
        <span class="text-h5">Clientes</span>
        <q-space />
        <q-input dense debounce="300" v-model="filter" placeholder="Buscar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- TABLE CELL 'ACTIVE'-->
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
      <!-- TABLE CELL WORKPLACES -->
      <template v-slot:body-cell-workplaces="props">
        <q-td :props="props">
          <span v-for="item in props.value" :key="item.id">
            <q-chip>{{ item.name }}</q-chip>
          </span>
        </q-td>
      </template>
      <!-- TABLE BOTTOM WITH DATA -->
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
      <!-- TABLE BOTTOM WITHOUT DATA -->
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
            Vas a eliminar el cliente
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
            <q-input
              v-model="inputName"
              label="Nombre del cliente"
              autofocus
              :rules="[
                (val) =>
                  (val && val.length >= 3) ||
                  'No puede estar vacio, mín. 3 chars',
              ]"
            />
            <q-toggle
              v-model="inputActive"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :label="inputActive ? 'Cliente activado' : 'Cliente desactivado'"
            />
            <q-select
              v-model="multiple"
              multiple
              :options="options"
              label="Centros de trabajo"
              use-chips
              stack-label
              style="max-width: 25vw"
            />
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
              label="Nombre del cliente"
              autofocus
              :rules="[
                (val) =>
                  (val && val.length >= 3) ||
                  'No puede estar vacio, mín. 3 chars',
              ]"
            />
            <q-toggle
              v-model="inputActive"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :label="inputActive ? 'Cliente activado' : 'Cliente desactivado'"
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
    <!--     <pre>{{ options }}</pre>
    <pre>{{ selected }}</pre>
    <pre>{{ settingsStore.customers }}</pre> -->
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useSettingsStore } from "src/stores/settings-store";

export default {
  setup() {
    const settingsStore = useSettingsStore();
    //Data
    const pagination = { sortBy: "name" };
    const columns = [
      {
        name: "name",
        label: "Cliente",
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
        name: "workplaces",
        label: "Centros asignados",
        align: "left",
        field: (row) =>
          row.Workplaces.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          ),
      },
    ];
    //Table
    const filter = ref("");
    let loading = ref(true);
    settingsStore.getCustomers();
    settingsStore.getWorkPlaces();
    loading.value = false;
    //Form
    const selected = ref([]);
    const inputName = ref("");
    const inputActive = ref(false);
    const multiple = ref([]);
    //Transform Workplaces into options of select (only active items)
    let options = settingsStore.workplaces
      .map((item) => {
        item.label = item.name;
        item.value = item.id;
        return item;
      })
      .filter((item) => item.deletedAt === null);
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
      await settingsStore.postCustomer({
        name: inputName.value,
        deletedAt: inputActive.value,
      });
      inputActive.value = false;
      inputName.value = "";
      loading.value = false;
    }
    //Updates
    const dialogEdit = ref(false);
    function showDialogEdit() {
      inputName.value = selected.value[0]?.name;
      inputActive.value = selected.value[0]?.deletedAt ? false : true;
      multiple.value = [];
      for (let i = 0; i < selected.value[0].Workplaces?.length; i++) {
        let op = options.filter(
          (item) => item.id === selected.value[0].Workplaces[i].id
        );
        multiple.value.push(op[0]);
      }
      dialogEdit.value = true;
    }
    async function updateSelected() {
      loading.value = true;
      dialogEdit.value = false;
      await settingsStore.putCustomer({
        id: selected.value[0].id,
        name: inputName.value,
        deletedAt: inputActive.value,
        workplaces: multiple.value,
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
      await settingsStore.deleteCustomer(selected.value[0]);
      selected.value = [];
      loading.value = false;
    }
    return {
      loading,
      options,
      multiple,
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
      inputName,
      showDialogAdd,
      showDialogEdit,
      settingsStore,
      onRowClick,
      pagination,
    };
  },
};
</script>
