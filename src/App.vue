<template>
  <router-view />
</template>

<script setup></script>
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
