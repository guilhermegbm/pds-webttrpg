<template>
  <q-page>
    <ul id="messages"></ul>
      <form id="form" action="">
        <input id="m" placeholder="Enter your message..." autocomplete="off" required />
      <button>Send</button>
    </form>
  </q-page>
</template>

<script>
// import io from 'socket.io-client'
// import socketio from 'socket.io-client'

export default ({
  data () {
    return {
    }
  },
  created () {
    // const socket = io('http://localhost:3000', { transports: ['websocket'] })
    debugger
    const gameId = 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e'
    const userId = '62ca2512-2f78-4bb2-84a5-e5d8bca0d660' // user felipe
    document.getElementById('form').submit(function (event) {
      event.preventDefault()

      // Envia a mensagem
      this.$socket.emit('game-chat-send-message', {
        userId,
        gameId,
        message: document.getElementById('m').val()
      })
      document.getElementById('messages').append(document.getElementById('<li id="list">').text('Você:  ' + document.getElementById('m').val()))
      document.getElementById('m').val('')
      return false
    })

    // Recebe a mensagem enviada por outro usuário
    this.$socket.on(gameId, function (response) {
      let name = 'Você'
      if (response.userId !== userId) {
        name = response.userName
      }
      document.getElementById('messages').append(document.getElementById('<li>').text(`${name}: ${response.message}`))
    })

    // Recebe todas as mensagens anteriores ao entrar no chat
    this.$socket.on('previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e', function (response) {
      console.log(response)
      debugger
      for (const index in response) {
        let name = 'Você'
        if (response[index].userId !== userId) {
          name = response[index].userName
        }
        document.getElementById('messages').append(document.getElementById('<li>').text(`${name}: ${response[index].message}`))
      }
    })
  },
  methods: {
  }
})

</script>
