<template>
  <q-page class="row overflow-hidden lust-for-list">
    <div class="col-9 flex flex-center overflow-hidden">
      Map
    </div>

    <div class="col bg-orange tabs-container">
      <q-tabs
        v-model="tab"
        shrink
        class="bg-grey-3 tabs-header"
        style="height: 8vh"
        >
        <q-tab name="chat" icon="chat" label="Chat" />
        <q-tab name="sheets" icon="description" label="Sheets" />
        <q-tab name="config" icon="settings" label="Settings" />
      </q-tabs>

      <q-tab-panels class="q-pa-md tabs-content" style="height: 92vh" v-model="tab" animated>
        <q-tab-panel name="chat" class="bg-blue" style="height: 80%">
          <Chat />
        </q-tab-panel>
        <q-tab-panel name="sheets">
          <Sheets />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

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
