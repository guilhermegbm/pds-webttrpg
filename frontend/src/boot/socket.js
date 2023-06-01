// import something here
// import VueSocketIO from 'vue-socket.io'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
// export default async ({ Vue }) => {
//   Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://localhost:3000'
//   }))
// // }
// import Vue from 'vue'
// import socketio from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'
// // debugger
// export const SocketInstance = socketio('http://localhost:3000', { transports: ['websocket'] })

// Vue.use(VueSocketIO, SocketInstance)

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

export default async ({ Vue }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000', { transports: ['websocket'] })
  }))
}
