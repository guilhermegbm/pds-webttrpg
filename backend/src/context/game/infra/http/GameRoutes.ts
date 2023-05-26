import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestCreateGame from "./HttpRestCreateGame";
import HttpRestGetAllPlayersByGame from "./HttpRestGetAllPlayersByGame";

export default class GameRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/game", new HttpRestCreateGame());
        server.on(HttpMethod.GET, "/game/:id/players", new HttpRestGetAllPlayersByGame());
    }
}
