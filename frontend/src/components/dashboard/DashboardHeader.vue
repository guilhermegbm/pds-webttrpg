<template>

  <div id="header" class="row">
    <div class="col-11">
      <p class="app-name" style="margin: 0px">
        Dragon's Den
      </p>
    </div>
    <div class="col-1">
      <q-btn round color="primary" style="float: right;">
        <q-avatar size="40px" font-size="20px" color="primary" text-color="white">G</q-avatar>
      </q-btn>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DashboardHeader'
}
</script>

<style scoped>
#header {
  min-height: 50px;
  margin: 0px 50px 0px 50px;
  align-items: center;
}

.app-name {
  font-weight: bold;
  font-size: 30px;
}
</style>
