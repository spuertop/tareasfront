<template>
  <q-page class="q-pa-md">
    <p class="text-h5">En este momento...</p>
    <!-- Nombre, cliente+servicio, horaInicio -->
    <q-table
      class="my-sticky-header-table"
      :columns="columns"
      :rows="recordsStore.nowrecords"
      row-key="codigoUsuario"
      bordered
      :rows-per-page-options="[0]"
    />
  </q-page>
</template>

<script>
import { useRecordsStore } from "src/stores/records-store";

const columns = [
  {
    name: "codigoUsuario",
    label: "Usuario",
    field: (row) => /* row.codigoUsuario + " " +  */ row.nombreUsuario,
    required: true,
    align: "left",
    sortable: true,
    format: (val, row) => `${val}`,
  },
  {
    name: "empresa",
    label: "Cliente",
    field: (row) => row.cliente + " - " + row.descripcionServicio,
    align: "left",
  },
  {
    name: "horaInicio",
    label: "Inicio",
    sortable: true,
    sortOrder: "da",
    align: "left",
    field: (row) =>
      new Date(row.horaInicio).toLocaleString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
];

export default {
  setup() {
    const recordsStore = useRecordsStore();
    recordsStore.getNowRecords();

    return {
      recordsStore,
      columns,
    };
  },
};
</script>
<style lang="scss">
.my-sticky-header-table {
  //height: 500px;
  //max-height: auto;
  height: 82vh;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: $secondary;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
thead tr:first-child th {
  top: 0;
}

/* this is when the loading indicator appears */
/* height of all previous header rows */
/*&.q-table--loading thead tr:last-child th {
  top: 48px;
}*/
</style>
