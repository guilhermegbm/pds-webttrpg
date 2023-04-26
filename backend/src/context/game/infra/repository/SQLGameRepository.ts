import database from "../../../../infra/database";
import Game from "../../domain/Game";
import GameRepository from "../../domain/GameRepository";

type GameTable = {
    id: string,
    name: string,
    maximum_players: number,
    description: string,
    user_id: string,
}

export default class SQLGameRepository implements GameRepository {
    
    async getByName(name: string): Promise<Game | null> {
        const gameData: GameTable | null = await database.oneOrNone("select * from webttrpg.game where name = $1", [name]);
        if (gameData) {
            return new Game(
                gameData.id,
                gameData.name,
                gameData.maximum_players,
                gameData.description,
                gameData.user_id);
        }
        return null;
    }

    async add(game: Game): Promise<void> {
        await database.none("insert into webttrpg.game (id, name, maximum_players, description, user_id) values ($1, $2, $3, $4, $5)",
            [
                game.getId(),
                game.getName(),
                game.getMaximumPlayers(),
                game.getDescription(),
                game.getUserId()
            ]
        );
    }
}
