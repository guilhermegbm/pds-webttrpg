import database from "../../../../infra/database";
import Game from "../../domain/Game";
import GameRepository from "../../domain/GameRepository";

type GameTable = {
    id: string,
    name: string,
    maximum_players: number,
    description: string,
    user_id: string,
    created_at: Date,
    start_date: Date,
    img_map_base_64: string,
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
                gameData.user_id,
                gameData.start_date,
                gameData.created_at,
                gameData.img_map_base_64
            );
        }
        return null;
    }

    async add(game: Game): Promise<void> {
        await database.none("insert into webttrpg.game (id, name, maximum_players, description, user_id, created_at, start_date, img_map_base_64) values ($1, $2, $3, $4, $5, $6, $7, $8)",
            [
                game.getId(),
                game.getName(),
                game.getMaximumPlayers(),
                game.getDescription(),
                game.getUserId(),
                game.getCreatedAt(),
                game.getStartDate(),
                game.getImgMapBase64()
            ]
        );
    }

    async listAll(): Promise<Game[]> {
      const allGamesFromTable: GameTable[] | null = await database.any("select * from webttrpg.game");
      
      //const allGames: Game[] = allGamesFromTable.map(gameTable => [ return new Game(gameTable.id)])
      
      let allGames: Game[] = [];

      for (let gameTable of allGamesFromTable) {
        let game = new Game(gameTable.id, gameTable.name, gameTable.maximum_players, gameTable.description, gameTable.user_id, gameTable.start_date, gameTable.created_at, gameTable.img_map_base_64);
        allGames.push(game);
      }
      return allGames;
    }

    async getById(gameId: string): Promise<Game | null> {
        const gameData: GameTable | null = await database.oneOrNone("select * from webttrpg.game where id = $1", [gameId]);
        if (gameData) {
            return new Game(
                gameData.id,
                gameData.name,
                gameData.maximum_players,
                gameData.description,
                gameData.user_id,
                gameData.start_date,
                gameData.created_at,
                gameData.img_map_base_64
            );
        }
        return null;
    }
}
