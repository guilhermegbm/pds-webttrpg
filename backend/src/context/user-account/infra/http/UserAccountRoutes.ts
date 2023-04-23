import Server, { HttpMethod } from "../../../../infra/http/Server";
import UserAccountController from "./UserAccountController";

export default class UserAccountRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/sign-in", UserAccountController.signIn);
        server.on(HttpMethod.POST, "/sign-up", UserAccountController.signUp);
    }
}
