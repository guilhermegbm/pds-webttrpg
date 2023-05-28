<template>
  <div class="">
    <q-chat-message
      v-for="message in messages"
      :key="message.id"
      :text="message.text"
      :sent="message.sent"
    />
    <q-input
      name="newMessage"
      square
      outlined
      type="textarea"
      v-model="newMessage"
      autogrow
      @keydown.enter.prevent="onSend()"
    />
  </div>
</template>

<script>
export default ({
  name: 'Chat',
  data () {
    return {
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
    }
  }
})
</script>
