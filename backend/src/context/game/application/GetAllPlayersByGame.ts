import Player from "../domain/Player";
import PlayerRepository from "../domain/PlayerRepository";

export default class GetAllPlayersByGame {

    constructor(
        readonly playerRepository: PlayerRepository
    ) {}

    async execute(gameId: string): Promise<Player[]> {
        if (!gameId) throw new Error("invalid game id");

        const players = await this.playerRepository.getAllByGame(gameId);
        return players;
    }
}