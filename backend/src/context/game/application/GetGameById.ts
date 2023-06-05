import Game from "../domain/Game";
import GameRepository from "../domain/GameRepository";
import PlayerRepository from "../domain/PlayerRepository";
import OutputGame from "./outputs/OutputGame";

export default class GetGameById {

  constructor(
    readonly gameRepository: GameRepository,
    readonly playerRepository: PlayerRepository
  ) { }

  async execute(idGame: string): Promise<OutputGame> {

    const gameById: Game | null = await this.gameRepository.getById(idGame);

    if (gameById == null) {
      throw new Error("game not found")
    }

    const player = await this.playerRepository.getById(gameById.getUserId());

    const outputGame = new OutputGame(gameById.getId(), gameById.getName(), gameById.getMaximumPlayers(), gameById.getDescription(), gameById.getStartDate(), gameById.getCreatedAt(), gameById.getImgMapBase64(), player)

    return outputGame;
  }
}
