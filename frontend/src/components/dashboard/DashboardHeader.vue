<template>

  <div id="header" class="row">
    <div class="col-11">
      <p class="app-name" style="margin: 0px">
        Dragon's Den
      </p>
    </div>
    <div class="col-1">
      <DefaultAvatar :userId="userId" :showFullUsername="false"/>
    </div>
  </div>

</template>

<script>
import DefaultAvatar from '../DefaultAvatar.vue'

export default {
  components: {
    DefaultAvatar
  },
  name: 'DashboardHeader',
  data () {
    return {
      userId: localStorage.getItem('userId')
    }
  }
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
