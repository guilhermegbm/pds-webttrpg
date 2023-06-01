<template>
  <div class="flex column container" :style="{ 'height': `${parentHeight}px` }">
    <div class="col scrollbar" style="display: flex; flex-direction: column-reverse; overflow-y: auto; overflow-x:hidden">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :text="message.text"
        :sent="message.sent"
      />
    </div>
    <div class="col-3">
      <p>Are we connected to the server? {{isConnected}}</p>
      <p>Message from server: "{{socketMessage}}"</p>
      <button @click="pingServer()">Ping Server</button>
      <q-input
        name="newMessage"
        class=""
        square
        outlined
        type="textarea"
        v-model="newMessage"
        autogrow
        @keydown.enter.prevent="onSend()"
      />
    </div>
  </div>
</template>

<style>
.scrollbar {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

.scrollbar::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>

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
      ],
      parentHeight: 0,
      isConnected: false,
      sockeTMessage: ''
    }
  },
  mounted () {
    this.parentHeight = this.$parent.$el.offsetHeight
  },
  sockets: {
    connect () {
      // Fired when the socket connects.
      this.isConnected = true
    },

    disconnect () {
      this.isConnected = false
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel (data) {
      this.socketMessage = data
    }
  },
  methods: {
    pingServer () {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!')
    },
    onSend () {
      if (this.newMessage === null) {
        return
      }
      this.messages.unshift(
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
