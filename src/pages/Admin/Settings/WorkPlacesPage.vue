<template>
  <q-page class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      bordered
      :rows-per-page-options="[0]"
      :columns="columns"
      :rows="rows"
      :filter="filter"
      no-data-label="No se han encontrado datos"
      row-key="name"
      v-model:selected="selected"
      selection="single"
    >
      <template v-slot:top="props">
        <div class="text-h5">
          <q-icon name="warehouse" /> Centros de trabajo
        </div>
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
          <q-btn round color="primary" icon="add" glossy @click="addRow" />
          <q-btn round color="secondary" icon="edit" glossy @click="addRow" />
        </div>
        <q-space />
        <q-btn round color="negative" icon="delete" glossy @click="addRow" />
      </template>
    </q-table>
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
    const rows = ref([
      { name: "Mollet", active: true },
      { name: "Madrid", active: false },
    ]);
    function addRow() {
      const newRow = { name: "Nuevo Centro", active: false };
      rows.value.push(newRow);
    }

    return {
      //  recordsStore,
      columns,
      rows,
      filter,
      addRow,
      selected,
    };
  },
};
</script>

<style scoped></style>
