import axios from 'axios'
import { Notify } from 'quasar'

export function someAction (/* context */) {
}

export function signIn (username, password) {
  const data = {
    username,
    password
  }
  axios.post('http://localhost:3000/sign-in', data)
    .then(response => {
      console.log(response)
    })
}

export function signUp (context, payload) {
  axios.post('http://localhost:3000/sign-up', payload)
    .then(response => {
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 2000,
        position: 'center',
        message: 'User created successfully!'
      })
      console.log(response)
    })
    .catch(error => {
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 2000,
        position: 'center',
        message: `Error: ${error.response.data.message}`
      })
      console.log(error)
    })
}
