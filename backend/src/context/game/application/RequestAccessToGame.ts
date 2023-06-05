import GameRepository from "../domain/GameRepository";
import PlayerRepository from "../domain/PlayerRepository";
import GamePlayerRepository from "../domain/repository/GamePlayerRepository";

export default class RequestAccessToGame {

  constructor(
    readonly gameRepository: GameRepository,
    readonly playerRepository: PlayerRepository,
    readonly gamePlayerRepository: GamePlayerRepository
  ) { }

  async execute(playerId: string, gameId: string) {

    const playerById = await this.playerRepository.getById(playerId)
    if (!playerById || playerById == null) {
      throw new Error("Player not found");
    }

    const gameById = await this.gameRepository.getById(gameId)
    if (!gameById || gameById == null) {
      throw new Error("Game not found");
    }

    const gamePlayerByPlayerIdAndGameId = await this.gamePlayerRepository.getPlayerByPlayerIdAndGameId(playerId, gameId)
    if (gamePlayerByPlayerIdAndGameId != null) {
      console.log(gamePlayerByPlayerIdAndGameId)
      throw new Error("This user has access to this game already");
    }

    await this.gamePlayerRepository.add(playerId, gameId);
  }
}