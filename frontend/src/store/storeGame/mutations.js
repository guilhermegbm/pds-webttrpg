export function someMutation (/* state */) {
}

export function setGameInfo (state, game) {
  state.gameId = game.id
  state.gameInfo = game
}
