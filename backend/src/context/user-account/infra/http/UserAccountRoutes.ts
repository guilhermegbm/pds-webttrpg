import Server, { HttpMethod } from "../../../../infra/http/Server";
import HttpRestSignIn from "./HttpRestSignIn";
import HttpRestSignUp from "./HttpRestSignUp";

export default class UserAccountRoutes {

    static defineRoutes(server: Server) {
        server.on(HttpMethod.POST, "/sign-in", new HttpRestSignIn());
        server.on(HttpMethod.POST, "/sign-up", new HttpRestSignUp());
    }
}
