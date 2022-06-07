<template>
  <q-page class="q-pa-md">
    <q-table
      class="my-sticky-table"
      bordered
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="workplaceStore.workplaces"
      :filter="filter"
      row-key="id"
      v-model:selected="selected"
      selection="single"
      @row-dblclick="onRowDlbClick"
      @row-click="onRowClick"
      :loading="loading"
      dense
    >
      <template v-slot:top>
        <q-icon name="warehouse" class="text-h5" />
        <span class="text-h5">Centros de trabajo</span>
        <q-space />
        <q-input dense debounce="300" v-model="filter" placeholder="Buscar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
    <!-- <pre>{{ selected }}</pre>
    <pre>{{ workplaceStore.workplaces }}</pre> -->
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useWorkplaceStore } from "src/stores/workplace-store";

export default {
  setup() {
    const workplaceStore = useWorkplaceStore();
    //Data
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
    ];
    //Table
    const filter = ref("");
    let loading = ref(true);
    workplaceStore.getWorkPlaces();
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
      await workplaceStore.postWorkPlace({
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
      dialogEdit.value = true;
    }
    async function updateSelected() {
      loading.value = true;
      dialogEdit.value = false;
      await workplaceStore.putWorkPlace({
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
      await workplaceStore.deleteWorkPlace(selected.value[0]);
      selected.value = [];
      loading.value = false;
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
      inputName,
      showDialogAdd,
      showDialogEdit,
      workplaceStore,
      onRowClick,
    };
  },
};
</script>

<style lang="scss">
.my-sticky-table {
  //min-height: 41vh;
  //max-height: 89vh;
  height: 89vh;
}
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: $grey;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
thead tr:first-child th {
  top: 0;
}
</style>
