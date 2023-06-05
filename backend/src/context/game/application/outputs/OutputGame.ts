import Player from "../../domain/Player";
import OutputPlayer from "./OutputPlayer";

export default class OutputGame {
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