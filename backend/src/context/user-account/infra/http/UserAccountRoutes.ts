import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestSignIn from "./HttpRestSignIn";
import UserAccountController from "./UserAccountController";

export default class UserAccountRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/sign-in", HttpRestSignIn.execute);
        server.on(HttpMethod.POST, "/sign-up", UserAccountController.signUp);
    }
}
