export function someMutation (/* state */) {
}

export function setLoggedUser (state, payload) {
  state.userId = payload.userId
  state.authenticationToken = payload.authenticationToken
}

export function cleanLoggedUser (state, payload) {
  state.userId = ''
  state.authenticationToken = ''
  localStorage.clear()
}
