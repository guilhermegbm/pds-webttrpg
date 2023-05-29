<template>
  <div id="main" class="row">
    <div class="col-12">

      <div class="row">
        <div class="col-12">
          <DashboardHeader />
        </div>
      </div>

      <hr style="margin: 0px 50px 0px 50px;" />

      <div class="row">
        <div class="col-12">
          <DashboardOptions />
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <DashboardMeusJogos />
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue'
import DashboardOptions from 'src/components/dashboard/DashboardOptions.vue'
import DashboardMeusJogos from 'src/components/dashboard/DashboardMeusJogos.vue'

export default {
  components: {
    DashboardHeader,
    DashboardOptions,
    DashboardMeusJogos
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
