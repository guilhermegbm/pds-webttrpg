import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

export default async ({ Vue }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000', { transports: ['websocket', 'polling'] })
  }))
}
