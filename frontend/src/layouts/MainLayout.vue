<template>
  <q-layout view="HHh lpr lFf" style="height: 100vh; width: 100vw">
    <q-header elevated>
      <q-toolbar class="bg-vermelho">
        <q-toolbar-title>
          Dragon's Den
        </q-toolbar-title>

        <div>
          <DefaultAvatar v-if="$store.state.storeUser.userId" :showFullUsername="false"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DefaultAvatar from '../components/DefaultAvatar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  components: {
    DefaultAvatar
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('storeUser', ['copyLoggedUserDataToVuex'])
  },
  created () {
    this.copyLoggedUserDataToVuex()
  }
}
</script>
