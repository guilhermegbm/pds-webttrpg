import axios from 'axios'
import { Notify } from 'quasar'

export function someAction (/* context */) {
}

export function signUp (context, payload) {
  axios.post('http://localhost:3000/sign-up', payload)
    .then(response => {
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 2000,
        position: 'top',
        message: 'User created successfully!'
      })
      this.$router.push('/signin')
      console.log(response)
    })
    .catch(error => {
      const msg = error.response.data.message ? error.response.data.message : error.message // error?.response?.data?.message ?? error?.message ?? 'erro'
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 2000,
        position: 'top',
        message: `Error: ${msg}`
      })
      console.log(error)
    })
}

export function signIn (context, payload) {
  const vm = this
  axios.post('http://localhost:3000/sign-in', payload)
    .then(response => {
      try {
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('authenticationToken', response.data.authenticationToken)
        context.commit('setLoggedUser', response.data)
        console.log(response)
        vm.$router.push('/dashboard')
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 2000,
          position: 'top',
          message: 'Logged in successfully!'
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 2000,
          position: 'top',
          message: 'Error while saving user data. Please, try again.'
        })
      }
    })
    .catch(error => {
      const msg = error.response.data.message ? error.response.data.message : error.message // error?.response?.data?.message ?? error?.message ?? 'erro'
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 2000,
        position: 'top',
        message: `Error: ${msg}`
      })
      console.log(error)
    })
}

export function copyLoggedUserDataToVuex (context, payload) {
  const userId = localStorage.getItem('userId')
  const authenticationToken = localStorage.getItem('authenticationToken')

  const data = {
    userId,
    authenticationToken
  }

  context.commit('setLoggedUser', data)
}

export function logOut (context, payload) {
  context.commit('cleanLoggedUser')
}
