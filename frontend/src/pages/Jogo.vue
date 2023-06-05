<template>
  <q-page class="row">
    <div class="col-9 flex flex-center">
      Map
    </div>

    <div class="col row" style="">
      <q-tabs
        v-model="tab"
        shrink vertical
        class="bg-grey-3 col-2"
        style=""
        >
        <q-tab name="chat" icon="chat" label="Chat" />
        <q-tab name="sheets" icon="description" label="Sheets" />
        <q-tab name="config" icon="settings" label="Settings" />
      </q-tabs>

      <q-tab-panels vertical class="col q-pa-md" v-model="tab" animated>
        <q-tab-panel name="chat" class="">
          <q-scroll-area class="" style="height:100%">
            <Chat />
          </q-scroll-area>
        </q-tab-panel>
        <q-tab-panel name="sheets">
          <Sheets />
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
      tab: 'chat'
    }
  }
}
</script>
