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
        @ondrag="startDrag($event, token.url)"
      />
      Map
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
          <Sheets ref="sheetsRef"/>
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

export default {
  name: 'Jogo',
  components: {
    Chat,
    Sheets
  },
  data () {
    return {
      tab: 'chat',
      draggedTokens: []
    }
  },
  methods: {
    startDrag (evt, token) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('sheetImg', token)
    },
    onDrop (evt) {
      const sheetImg = evt.dataTransfer.getData('sheetImg')
      this.draggedTokens.push({
        url: sheetImg,
        style: `position:absolute; height: 32px; width: 32px; left:${evt.layerX}px; top:${evt.layerY}px`
      })
    }
  }
}
</script>
