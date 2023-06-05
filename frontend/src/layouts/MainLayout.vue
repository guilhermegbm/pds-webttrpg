<template>
  <q-layout view="HHh lpr lFf" style="height: 100vh; width: 100vw">
    <q-header elevated>
      <q-toolbar class="bg-vermelho">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Dragon's Den
        </q-toolbar-title>

        <div>
          <DefaultAvatar v-if="$store.state.storeUser.userId" :showFullUsername="false"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      elevated
      content-class="bg-grey-1"    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Páginas
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import DefaultAvatar from '../components/DefaultAvatar.vue'
import { mapActions } from 'vuex'

const linksData = [
  {
    title: 'Sign in',
    icon: 'school',
    link: 'signin'
  },
  {
    title: 'Sign up',
    icon: 'code',
    link: 'signup'
  },
  {
    title: 'Criar jogo',
    icon: 'chat',
    link: 'create_game'
  },
  {
    title: 'Jogo',
    icon: 'chat',
    link: 'game'
  },
  {
    title: 'Dashboard',
    icon: 'chat',
    link: 'dashboard'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
    DefaultAvatar
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
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
