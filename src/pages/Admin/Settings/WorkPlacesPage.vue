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
      row-key="name"
      v-model:selected="selected"
      selection="single"
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
          <q-btn round color="accent" icon="add" glossy @click="addRow" />
          <q-btn round color="accent" icon="edit" glossy @click="addRow" />
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
    <q-dialog v-model="confirmDelete" persistent>
      <q-card class="bg-negative text-white">
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="white" text-color="negative" />
          <span class="q-ml-sm"
            >Esta acción no se puede deshacer.<br />
            ¿Seguro que lo quieres borrar?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="No, cancelar" color="primary" v-close-popup />
          <q-btn
            label="Sí, eliminar"
            color="positive"
            v-close-popup
            @click="deleteSelected"
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
    field: (row) => row.name /* row.codigoUsuario + " " +   row.nombreUsuario*/,
    required: true,
    align: "left",
    sortable: true,
    format: (val, row) => `${val}`,
  },
  {
    name: "active",
    label: "Activo",
    field: (row) => row.active, //row.cliente + " - " + row.descripcionServicio,
    align: "left",
  },
];
export default {
  setup() {
    //    const recordsStore = useRecordsStore();
    //  recordsStore.getNowRecords();
    const filter = ref("");
    const selected = ref([]);
    const confirmDelete = ref(false);
    const rows = ref([
      { name: "Mollet", active: true },
      { name: "Madrid", active: false },
    ]);
    function addRow() {
      const newRow = { name: "Nuevo Centro", active: false };
      rows.value.push(newRow);
    }
    function deleteSelected() {
      rows.value = rows.value.filter((item) => {
        console.log(selected.value[0] !== item);
        return item !== selected.value[0];
      });
      selected.value = [];
    }

    return {
      //  recordsStore,
      columns,
      rows,
      filter,
      selected,
      addRow,
      confirmDelete,
      deleteSelected,
    };
  },
};
</script>

<style lang="scss">
.my-sticky-table {
  height: auto;
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
