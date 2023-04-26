import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestCreateGame from "./HttpRestCreateGame";

export default class GameRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/game", HttpRestCreateGame.execute);
    }
}