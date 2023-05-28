<template>
  <div id="main" class="row">
    <div class="col-12">

      <div id="header" class="row">
        <div class="col-11">
          <p class="app-name" style="margin: 0px">
            Dragon's Den
          </p>
        </div>
        <div class="col-1">
          <q-btn round color="primary">
            <q-avatar size="40px" font-size="20px" color="primary" text-color="white">G</q-avatar>
          </q-btn>
        </div>
      </div>

      <hr style="margin: 0px 50px 0px 50px;" />

    </div>
  </div>
</template>

<script>
export default {
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
