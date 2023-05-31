<template>
  <q-page>oiu
  </q-page>
</template>

<script>
import io from 'socket.io-client'
console.log(io)
debugger

const socket = io('http://localhost:3000', { transports: ['websocket'] })
const gameId = 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e'
const userId = '62ca2512-2f78-4bb2-84a5-e5d8bca0d660' // user felipe
document.getElementById('form').submit(function (event) {
  event.preventDefault()

  // Envia a mensagem
  socket.emit('game-chat-send-message', {
    userId,
    gameId,
    message: document.getElementById('#m').val()
  })
  document.getElementById('#messages').append(document.getElementById('<li id="list">').text('Você:  ' + document.getElementById('#m').val()))
  document.getElementById('#m').val('')
  return false
})

// Recebe a mensagem enviada por outro usuário
socket.on(gameId, function (response) {
  let name = 'Você'
  if (response.userId !== userId) {
    name = response.userName
  }
  document.getElementById('#messages').append(document.getElementById('<li>').text(`${name}: ${response.message}`))
})

// Recebe todas as mensagens anteriores ao entrar no chat
socket.on('previus-bb927da9-b9db-4c90-a0b8-1dfb4420d32e', function (response) {
  for (const index in response) {
    let name = 'Você'
    if (response[index].userId !== userId) {
      name = response[index].userName
    }
    document.getElementById('#messages').append(document.getElementById('<li>').text(`${name}: ${response[index].message}`))
  }
})

</script>
