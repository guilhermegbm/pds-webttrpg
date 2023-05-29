import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestCreateGame from "./HttpRestCreateGame";
import HttpRestListAllGames from "./HttpRestListAllGames";
import HttpRestCreateGameChip from "./HttpRestCreateGameChip";
import HttpRestGetAllGameChipsByPlayerAndGame from "./HttpRestGetAllGameChipsByPlayerAndGame";
import HttpRestGetAllPlayersByGame from "./HttpRestGetAllPlayersByGame";

export default class GameRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/game", new HttpRestCreateGame());
        server.on(HttpMethod.GET, "/game", new HttpRestListAllGames());
        server.on(HttpMethod.GET, "/game/:id/players", new HttpRestGetAllPlayersByGame());
        server.on(HttpMethod.POST, "/game/:id/game-chip", new HttpRestCreateGameChip());
        server.on(HttpMethod.GET, "/game/:id/game-chip", new HttpRestGetAllGameChipsByPlayerAndGame());
    }
}
