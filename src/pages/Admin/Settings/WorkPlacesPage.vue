<template>
  <q-page class="q-pa-md">
    <q-table
      class="my-sticky-table"
      bordered
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="rows"
      :filter="filter"
      no-data-label="No se han encontrado datos"
      no-results-label="Sin coincidencias"
      row-key="code"
      v-model:selected="selected"
      selection="single"
      @row-dblclick="onRowDlbClick"
    >
      <template v-slot:top="props">
        <q-chip
          color="grey"
          text-color="black"
          square
          size="xl"
          icon="warehouse"
        >
          Centros de trabajo
        </q-chip>
        <q-space />
        <q-input dense debounce="300" v-model="filter" placeholder="Buscar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
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
    </q-table>
    <!-- DIALOG CONFIRM DELETE -->
    <q-dialog v-model="confirmDelete" persistent>
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
          <q-form class="q-ma-sm" @submit.prevent="saveSelected">
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
            @click="saveSelected"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";

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
    field: (row) => row.active,
    align: "left",
  },
];
export default {
  setup() {
    const filter = ref("");
    const selected = ref([]);
    const confirmDelete = ref(false);
    const dialogEdit = ref(false);
    const dialogAdd = ref(false);
    const inputName = ref("");
    const inputActive = ref(false);

    const rows = ref([
      { name: "Mollet", active: true, code: 5 },
      { name: "Madrid", active: false, code: 4 },
    ]);
    function addRow() {
      const newRow = {
        name: "Nuevo Centro",
        active: false,
        code: Math.random(),
      };
      rows.value.push(newRow);
    }
    function deleteSelected() {
      rows.value = rows.value.filter((item) => {
        return item !== selected.value[0];
      });
      selected.value = [];
    }

    function saveSelected() {
      dialogAdd.value = false;
      let newOb = {
        name: inputName.value,
        active: inputActive.value,
        code: Math.random(),
      };
      rows.value.push(newOb);
      inputActive.value = false;
      inputName.value = "";
    }

    function updateSelected() {
      dialogEdit.value = false;
      rows.value.map((item) => {
        if (item.code === selected.value[0].code) {
          item.name = inputName.value;
          item.active = inputActive.value;
        }
      });
    }
    function onRowDlbClick(evt, row, index) {
      selected.value = [row];
      showDialogEdit();
    }
    function showDialogAdd() {
      selected.value = [];
      dialogAdd.value = true;
      inputActive.value = false;
      inputName.value = "";
    }
    function showDialogEdit() {
      dialogEdit.value = true;
      inputName.value = selected.value[0]?.name;
      inputActive.value = selected.value[0]?.active;
    }

    return {
      columns,
      rows,
      filter,
      selected,
      addRow,
      confirmDelete,
      dialogAdd,
      dialogEdit,
      deleteSelected,
      saveSelected,
      updateSelected,
      onRowDlbClick,
      inputActive,
      inputName,
      showDialogAdd,
      showDialogEdit,
    };
  },
};
</script>

<style lang="scss">
.my-sticky-table {
  height: 41vh;
}
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: $grey;
  padding-top: 6px;
  padding-bottom: 0pt;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
thead tr:first-child th {
  top: 0;
}
</style>
