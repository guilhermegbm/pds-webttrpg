import HttpRestController from "./HttpRestController";
import Middleware from "./Middleware";

export enum HttpMethod {
    POST = "post",
    GET = "get"
}

export default interface Server {
    listen(port: number): void;
    on(httpMethod: HttpMethod, api: string, endpoint: HttpRestController): void
    addMiddleware(middleware: Middleware): void;
}

