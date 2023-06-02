<template>
  <div class="flex column container" :style="{ 'height': `${parentHeight}px` }">
    <div class="col scrollbar" style="display: flex; flex-direction: column-reverse; overflow-y: auto; overflow-x:hidden">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :text="[message.message]"
        :sent="message.userId === $store.state.storeUser.userId"
      />
      {{ messages }}
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

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.1/socket.io.js"></script>
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
      socketMessage: ''
    }
  },
  mounted () {
    debugger
    // this.$socket.connect()
    this.parentHeight = this.$parent.$el.offsetHeight
    // this.sockets.subscribe('previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e', messages => {
    //   this.messages = messages.reverse()
    //   console.log(messages)
    // })
    this.meuSocket = io("http://localhost:3000", {transports: ['websocket', 'polling', 'flashsocket']})
    this.meuSocket.on("previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e", (response) => {
      this.messages = response.reverse()
    })

    // RETIRAR ESSE EMIT. COLOQUEI SÓ PRA TESTAR
    this.meuSocket.emit('game-chat-send-message', {
      userId: '62ca2512-2f78-4bb2-84a5-e5d8bca0d660',
      gameId: 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e',
      message: 'test_mounted'
    })
  },
  beforeDestroy () {
    debugger
    // this.sockets.unsubscribe('previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e')
    // this.$socket.disconnect()
  },
  destroyed () {
    debugger
  },
  sockets: {
    connect () {
      debugger
      // Fired when the socket connects.
      this.isConnected = true
    },

    disconnect () {
      debugger
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
      // this.$socket.emit('pingServer', 'PING!')
      this.$socket.connect()
    },
    onSend () {
      if (this.newMessage === null) {
        return
      }
      // É IMPORTANTE PEGAR O USER_ID, QUE É O DA PESSOA LOGADA E SUBSTITUIR AQUI
      // E TB PEGAR O ID JOGO
      this.meuSocket.emit('game-chat-send-message', {
        userId: '62ca2512-2f78-4bb2-84a5-e5d8bca0d660',
        gameId: 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e',
        message: this.newMessage
      })
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
