import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestCreateGame from "./HttpRestCreateGame";
import HttpRestListAllGames from "./HttpRestListAllGames";
import HttpRestCreateGameChip from "./HttpRestCreateGameChip";
import HttpRestGetAllGameChipsByPlayerAndGame from "./HttpRestGetAllGameChipsByPlayerAndGame";
import HttpRestGetAllPlayersByGame from "./HttpRestGetAllPlayersByGame";
import HttpRestDeleteGameChip from "./HttpRestDeleteGameChip";
import HttpRestUpdateGameChip from "./HttpRestUpdateGameChip";
import HttpRestGetGameById from "./HttpRestGetGameById";

export default class GameRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/game", new HttpRestCreateGame());
        server.on(HttpMethod.GET, "/game", new HttpRestListAllGames());
        server.on(HttpMethod.GET, "/game/:game_id", new HttpRestGetGameById());
        server.on(HttpMethod.GET, "/game/:id/players", new HttpRestGetAllPlayersByGame());
        server.on(HttpMethod.POST, "/game/:id/game-chip", new HttpRestCreateGameChip());
        server.on(HttpMethod.GET, "/game/:id/game-chip", new HttpRestGetAllGameChipsByPlayerAndGame());
        server.on(HttpMethod.DELETE, "/game/:game_id/game-chip/:game_chip_id", new HttpRestDeleteGameChip());
        server.on(HttpMethod.PUT, "/game/:game_id/game-chip/:game_chip_id", new HttpRestUpdateGameChip());
    }
}
