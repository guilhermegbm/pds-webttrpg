import Player from "./Player";

export default interface PlayerRepository {

    getAllByGame(gameId: string): Promise<Player[]>;
    getById(playerId: string): Promise<Player | null>;
}
