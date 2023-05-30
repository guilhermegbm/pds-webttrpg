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

    /*const outputGames = allGames.map(async game => {
      const player = await this.playerRepository.getById(game.getUserId());
      return new OutputGame(game.getId(), game.getName(), game.getMaximumPlayers(), game.getDescription(), game.getStartDate(), game.getCreatedAt(), player)
    })*/

    let outputGames: OutputGame[] = []
    for (const game of allGames) {
      const player = await this.playerRepository.getById(game.getUserId());
      const outputGame = new OutputGame(game.getId(), game.getName(), game.getMaximumPlayers(), game.getDescription(), game.getStartDate(), game.getCreatedAt(), player)
      outputGames.push(outputGame)
    }

    return outputGames;
  }
}



class OutputPlayer {
  private id: string;
  private username: string;

  constructor(
    id: string,
    username: string
  ) {
    this.validateName(username);

    this.id = id;
    this.username = username;
  }

  private validateName(name: string): void {
    if (!name) throw new Error("undefined name");
  }

  public getId() {
    return this.id;
  }

  public getUsername() {
    return this.username;
  }
}

class OutputGame {
  private id: string;
  private name: string;
  private maximumPlayers: number;
  private description: string;
  private startDate: Date;
  private createdAt: Date;
  private authorPlayer: OutputPlayer | null

  constructor(
    id: string,
    name: string,
    maximumPlayers: number,
    description: string,
    startDate: Date,
    createdAt: Date | null,
    authorPlayer: Player | null
  ) {
    this.id = id;
    this.name = name;
    this.maximumPlayers = maximumPlayers;
    this.description = description;
    this.startDate = startDate;
    this.createdAt = createdAt == null ? new Date() : createdAt;
    if (authorPlayer != null) {
      this.authorPlayer = new OutputPlayer(authorPlayer.getId(), authorPlayer.getUsername())
    } else {
      this.authorPlayer = null
    }

  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getMaximumPlayers() {
    return this.maximumPlayers;
  }

  public getDescription() {
    return this.description;
  }

  public getStartDate() {
    return this.startDate;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getAuthorPlayer() {
    return this.authorPlayer;
  }
}