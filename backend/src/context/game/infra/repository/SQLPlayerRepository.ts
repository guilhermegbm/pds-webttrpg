import database from "../../../../infra/database";
import Player from "../../domain/Player";
import PlayerRepository from "../../domain/PlayerRepository";

export default class SQLPlayerRepository implements PlayerRepository {

    async getAllByGame(gameId: string): Promise<Player[]> {
        const playersData = await database.manyOrNone("select u.id, u.username from webttrpg.user as u, webttrpg.game_user as gu where u.id = gu.user_id and gu.game_id = $1", [gameId]);
        if (!playersData) {
            return [];
        }
        const players = playersData.map((playerData) => {
            return new Player(playerData.id, playerData.username);
        })
        return players;
    }
}
