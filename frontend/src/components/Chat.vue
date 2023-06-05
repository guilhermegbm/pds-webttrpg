<template>
  <div class="flex column container" :style="{ 'height': `${parentHeight}px` }">
    <div class="col scrollbar" style="display: flex; flex-direction: column-reverse; overflow-y: auto; overflow-x:hidden">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :name="message.userName"
        :text="[message.message]"
        :sent="message.userId === $store.state.storeUser.userId"
      />
    </div>
    <div class="col-1">
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
      messages: [],
      parentHeight: 0
    }
  },
  mounted () {
    this.parentHeight = this.$parent.$el.offsetHeight
    this.meuSocket = io("http://localhost:3000", { transports: ['websocket', 'polling', 'flashsocket'] })
    this.meuSocket.on(`previus-${this.$store.state.storeGame.gameId}`, (response) => {
      this.messages = response.reverse()
    })
    this.meuSocket.on(this.$store.state.storeGame.gameId, (response) => {
      const msg = {
        message: response.message,
        messageId: response.messageId,
        userId: response.userId,
        userName: response.userName
      }
      this.messages.unshift(msg)
    })
  },
  methods: {
    onSend () {
      if (this.newMessage === null) {
        return
      }
      // É IMPORTANTE PEGAR O USER_ID, QUE É O DA PESSOA LOGADA E SUBSTITUIR AQUI
      // E TB PEGAR O ID JOGO
      this.meuSocket.emit('game-chat-send-message', {
        userId: this.$store.state.storeUser.userId,
        gameId: this.$store.state.storeGame.gameId,
        message: this.newMessage
      })
      this.meuSocket.disconnect()
      this.meuSocket.connect()
      this.meuSocket.on(`previus-${this.$store.state.storeGame.gameId}`, (response) => {
        this.messages = response
      })

      this.newMessage = null
    }
  }
})
</script>
