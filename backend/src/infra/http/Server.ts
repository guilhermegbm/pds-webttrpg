import HttpRestController from "./HttpRestController";
import Middleware from "./Middleware";
import http from "http";

export enum HttpMethod {
    POST = "post",
    GET = "get",
    DELETE = "delete",
    PUT = "put",
}

export default interface Server {
    listen(port: number): void;
    on(httpMethod: HttpMethod, api: string, endpoint: HttpRestController): void
    addMiddleware(middleware: Middleware): void;
    getHttpServer(): http.Server
}
