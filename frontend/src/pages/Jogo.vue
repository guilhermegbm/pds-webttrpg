<template>
  <q-page class="row">
    <div
      class="col-9 flex flex-center"
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent>
      <q-img
        v-for="(token, index) in draggedTokens"
        :src="token.url"
        :key="index"
        :style="token.style"
        draggable
        @dragstart="startDrag($event, token)"
      />
      <q-img style="z-index: -99;" :src="game.imgMapBase64" alt="Mapa do Jogo"/>
    </div>

    <div class="col row" style="">
      <q-tabs
        v-model="tab"
        shrink vertical
        class="bg-grey-3 col-2"
        style=""
        >
        <q-tab name="chat" icon="chat" />
        <q-tab name="sheets" icon="description" />
        <q-tab name="config" icon="settings" />
      </q-tabs>

      <q-tab-panels vertical class="col q-pa-md" v-model="tab" animated>
        <q-tab-panel name="chat" class="">
          <q-scroll-area class="" style="height:100%">
            <Chat />
          </q-scroll-area>
        </q-tab-panel>
        <q-tab-panel name="sheets">
          <Sheets :game="game" />
        </q-tab-panel>
        <q-tab-panel name="config">
          <q-btn color="primary" label="Sair do Jogo" @click="leaveGame()"/>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<style>
html, body {
  overflow: hidden !important
}
</style>

<script>
import Chat from '../components/Chat.vue'
import Sheets from '../components/Sheets.vue'
import { api } from 'boot/axios'

const config = {
  headers: {
    Authorization: localStorage.getItem('authenticationToken')
  }
}

export default {
  name: 'Jogo',
  components: {
    Chat,
    Sheets
  },
  data () {
    return {
      gameId: this.$route.params.gameId,
      game: [],
      tab: 'chat',
      draggedTokens: []
    }
  },
  mounted () {

  },
  methods: {
    startDrag (evt, token) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      const tokenArr = [token.id, token.url]
      evt.dataTransfer.setData('sheet', tokenArr)
    },
    onDrop (evt) {
      const sheet = evt.dataTransfer.getData('sheet')
      const splitSheet = sheet.split(',')
      const currToken = this.draggedTokens.find((elm) => elm.id === splitSheet[0])
      if (!currToken) {
        this.draggedTokens.push({
          id: splitSheet[0],
          url: splitSheet[1],
          style: `position:absolute; height: 64px; width: 64px; left:${evt.layerX}px; top:${evt.layerY}px`
        })
      } else {
        currToken.style = `position:absolute; height: 64px; width: 64px; left:${evt.layerX}px; top:${evt.layerY}px`
      }
    },
    leaveGame () {
      this.$router.push('/dashboard')
    }
  },
  beforeMount () {
    api.get(`/game/${this.gameId}`, config)
      .then((response) => {
        this.game = response.data
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
