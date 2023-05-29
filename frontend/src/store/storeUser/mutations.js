export function someMutation (/* state */) {
}

export function setLoggedUser (state, payload) {
  state.userId = payload.userId
  state.authenticationToken = payload.authenticationToken
}
