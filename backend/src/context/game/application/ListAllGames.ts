import Game from "../domain/entity/Game";
import GameRepository from "../domain/repository/GameRepository";
import PlayerRepository from "../domain/repository/PlayerRepository";
import OutputGame from "./outputs/OutputGame";

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
    });

    return await Promise.all(outputGames);
  }
}