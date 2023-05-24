import database from "../../../../infra/database";
import GameUserRepository from "../../domain/repository/GameUserRepository";

export default class SQLGameUserRepository implements GameUserRepository {

    async userIsInTheGame(userId: string, gameId: string): Promise<boolean> {
        const result = await database.one("select count(*) as total from webttrpg.game_user where user_id = $1 and game_id = $2", [userId, gameId]);
        return result.total > 0;
    }

    async getAllGameId(): Promise<string[]> {
        const gameIds = await database.manyOrNone("select distinct(game_id) as game_id from webttrpg.game_user");
        if (!gameIds) {
            return [];
        }
        return gameIds.map(gameId => gameId.game_id);
    }
}
