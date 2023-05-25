import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestCreateGame from "./HttpRestCreateGame";
import HttpRestListAllGames from "./HttpRestListAllGames";

export default class GameRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/game", new HttpRestCreateGame());
        server.on(HttpMethod.GET, "/game/listAll", new HttpRestListAllGames());
    }
}