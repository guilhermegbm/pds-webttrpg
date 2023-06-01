import Player from "../Player";

export default interface GamePlayerRepository {

    getPlayerByPlayerIdAndGameId(playerId: string, gameId: string): Promise<Player | null>;
    add(playerId: string, gameId: string): Promise<void>;
}
