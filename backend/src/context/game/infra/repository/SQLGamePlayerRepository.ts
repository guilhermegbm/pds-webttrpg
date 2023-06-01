import database from "../../../../infra/database";
import Player from "../../domain/Player";
import GamePlayerRepository from "../../domain/repository/GamePlayerRepository";

export default class SQLGamePlayerRepository implements GamePlayerRepository {

    async add(playerId: string, gameId: string): Promise<void> {
        await database.none("insert into webttrpg.game_user (user_id, game_id, created_at) values ($1, $2, $3)",
            [
                playerId,
                gameId,
                new Date()
            ]
        );
    }

    async getPlayerByPlayerIdAndGameId(playerId: string, gameId: string): Promise<Player | null> {
        const result = await database.oneOrNone("select u.id, u.username from webttrpg.user as u, webttrpg.game_user as gu where gu.user_id = u.id and gu.user_id = $1 and gu.game_id = $2", [playerId, gameId]);
        if (result) {
            return new Player(result.id, result.username);
        }
        return null;
    }
}
