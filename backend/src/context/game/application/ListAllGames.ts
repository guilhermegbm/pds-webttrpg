import Game from "../domain/Game";
import GameRepository from "../domain/GameRepository";
import Player from "../domain/Player";
import PlayerRepository from "../domain/PlayerRepository";

export default class ListAllGames {

  constructor(
    readonly gameRepository: GameRepository,
    readonly playerRepository: PlayerRepository
  ) { }

  async execute(): Promise<OutputGame[]> {

    const allGames: Game[] = await this.gameRepository.listAll();

    const outputGames = allGames.map(async game => {
      const player = await this.playerRepository.getById(game.getUserId());
      return new OutputGame(game.getId(), game.getName(), game.getMaximumPlayers(), game.getDescription(), game.getStartDate(), game.getCreatedAt(), game.getImgMapBase64(), player)
    })

    /*let outputGames: OutputGame[] = []
    for (const game of allGames) {
      const player = await this.playerRepository.getById(game.getUserId());
      const outputGame = new OutputGame(game.getId(), game.getName(), game.getMaximumPlayers(), game.getDescription(), game.getStartDate(), game.getCreatedAt(), player)
      outputGames.push(outputGame)
    }*/

    return await Promise.all(outputGames);
  }
}

class OutputPlayer {

  constructor(
    readonly id: string,
    readonly username: string
  ) { }
}

class OutputGame {

  private authorPlayer: OutputPlayer | null

  constructor(
    readonly id: string,
    readonly name: string,
    readonly maximumPlayers: number,
    readonly description: string,
    readonly startDate: Date,
    readonly createdAt: Date | null,
    readonly imgMapBase64: string,
    authorPlayer: Player | null
  ) {
    if (authorPlayer != null) {
      this.authorPlayer = new OutputPlayer(authorPlayer.getId(), authorPlayer.getUsername())
    } else {
      this.authorPlayer = null
    }
  }

  public getAuthorPlayer() {
    return this.authorPlayer;
  }
}