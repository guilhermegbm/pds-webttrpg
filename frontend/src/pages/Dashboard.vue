<template>
  <q-page id="main" class="row">
    <div class="col-12">
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
  </q-page>
</template>

<script>

import DashboardOptions from 'src/components/dashboard/DashboardOptions.vue'
import DashboardMyGames from 'src/components/dashboard/DashboardMyGames.vue'

export default {
  components: {
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
