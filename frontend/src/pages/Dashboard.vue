<template>
  <div id="main" class="row">
    <div class="col-12">

      <DashboardHeader />

    </div>
  </div>
</template>

<script>

import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue'

export default {
  components: {
    DashboardHeader
  },
  data () {
    return {
      teste: 'Valor Teste'
    }
  }
}
</script>

<style>
#main {
  background-color: #E7E7E7;
}
</style>
