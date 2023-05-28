import axios from 'axios'

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

export function signUp (username, password, confirmationPassword) {
  const data = {
    username,
    password,
    confirmationPassword
  }

  axios.post('http://localhost:3000/sign-up', data)
    .then(response => {
      console.log(response)
    })
}
