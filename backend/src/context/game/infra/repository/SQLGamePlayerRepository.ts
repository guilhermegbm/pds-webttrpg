import database from "../../../../infra/database";
import Player from "../../domain/Player";
import GamePlayerRepository from "../../domain/repository/GamePlayerRepository";

export default class SQLGamePlayerRepository implements GamePlayerRepository {

    async getPlayerByPlayerIdAndGameId(playerId: string, gameId: string): Promise<Player | null> {
        const result = await database.oneOrNone("select u.id, u.username from webttrpg.user as u, webttrpg.game_user as gu where gu.user_id = u.id and gu.user_id = $1 and gu.game_id = $2", [playerId, gameId]);
        if (result) {
            return new Player(result.id, result.username);
        }
        return null;
    }
}
