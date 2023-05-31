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
          <DashboardMyGames />
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue'
import DashboardOptions from 'src/components/dashboard/DashboardOptions.vue'
import DashboardMyGames from 'src/components/dashboard/DashboardMyGames.vue'

export default {
  components: {
    DashboardHeader,
    DashboardOptions,
    DashboardMyGames
  }
}
</script>

<style>
#main {
  background-color: #E7E7E7;
}
</style>
