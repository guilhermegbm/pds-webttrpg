<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-stretch row">
        <div class="flex flex-center col-9">Map</div>
        <q-separator vertical size="4px" color="blue" />
        <div
          class="column col"
        >
          <q-tabs
            v-model="tab"
            dense
            shrink
            class="bg-grey-3"
            narrow-indicator
          >
            <q-tab name="chat" label="Chat" />
            <q-tab name="sheets" label="Sheets" />
            <q-tab name="config" label="Config" />
          </q-tabs>

          <q-tab-panels class="q-pa-md" v-model="tab" animated>
            <q-tab-panel name="chat">
              <q-chat-message
                v-for="message in messages"
                :key="message.id"
                :text="message.text"
                :sent="message.sent" />
              <q-input
                name="newMessage"
                square
                outlined
                type="textarea"
                v-model="newMessage"
                autogrow
                @keydown.enter.prevent="onSend()"
              />
            </q-tab-panel>
            <q-tab-panel name="sheets">
              <q-btn color="primary" label="Add" onclick="addItem()"/>
            </q-tab-panel>
          </q-tab-panels>
      </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Jogo',
  data () {
    return {
      tab: 'chat',
      chatMessages: null,
      newMessage: null,
      messages: [
        {
          id: 1,
          text: ['This is a message'],
          sent: true
        },
        {
          id: 2,
          text: ['Hello how is it going?'],
          sent: false
        }
      ]
    }
  },
  methods: {
    onSend () {
      if (this.newMessage === null) {
        return
      }

      this.messages.push(
        {
          id: this.messages.length + 1,
          text: [this.newMessage],
          sent: true
        }
      )
      this.newMessage = null
    },
    addItem() {
      console.log("Adding item")
    }
  }
}
</script>
