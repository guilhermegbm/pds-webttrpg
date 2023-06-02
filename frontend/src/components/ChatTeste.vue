<template>
  <q-page>
    <ul id="messages"></ul>
      <form id="form" action="">
        <input id="m" placeholder="Enter your message..." autocomplete="off" required />
      <button>Send</button>
      {{ isConnected }}
    </form>
  </q-page>
</template>

<script>

export default ({
  data () {
    return {
      messages: [],
      isConnected: false
    }
  },
  created () {
    this.$socket.onAny((event) => {
      debugger
      console.log(event)
    })
  },
  mounted () {
    debugger
    this.$socket.onAny((event) => {
      debugger
      console.log(event)
    })
    this.sockets.subscribe('previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e', data => {
      debugger
      console.log(data)
    })
    // this.$options.socket.
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
      debugger
      this.socketMessage = data
    }
  },
  // created () {
  //     // const socket = io('http://localhost:3000', { transports: ['websocket'] })
  //     // debugger
  //     // const gameId = 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e'
  //     const userId = '62ca2512-2f78-4bb2-84a5-e5d8bca0d660' // user felipe
  //     // document.getElementById('form').submit(function (event) {
  //     //   event.preventDefault()

  //     //   // Envia a mensagem
  //     //   socket.emit('game-chat-send-message', {
  //     //     userId,
  //     //     gameId,
  //     //     message: document.getElementById('m').val()
  //     //   })
  //     //   document.getElementById('messages').append(document.getElementById('<li id="list">').text('Você:  ' + document.getElementById('m').val()))
  //     //   document.getElementById('m').val('')
  //     //   return false
  //     // })

  //     // // Recebe a mensagem enviada por outro usuário
  //     // socket.on(gameId, function (response) {
  //     //   let name = 'Você'
  //     //   if (response.userId !== userId) {
  //     //     name = response.userName
  //     //   }
  //     //   document.getElementById('messages').append(document.getElementById('<li>').text(`${name}: ${response.message}`))
  //     // })

  //     debugger
  //     // Recebe todas as mensagens anteriores ao entrar no chat
  //     this.$socket.on('previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e', function (response) {
  //       debugger
  //       console.log(response)
  //       for (const index in response) {
  //         let name = 'Você'
  //         if (response[index].userId !== userId) {
  //           name = response[index].userName
  //         }
  //         document.getElementById('messages').append(document.getElementById('<li>').text(`${name}: ${response[index].message}`))
  //       }
  //     })
  //   },
  methods: {
  }
})

</script>
