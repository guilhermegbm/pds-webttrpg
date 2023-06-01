import express, { Request, Response } from "express"
import Server, { HttpMethod } from "../Server";
import ExpressRequest from "./ExpressRequest";
import ExpressResponse from "./ExpressResponse";
import Middleware from "../Middleware";
import HttpRestController from "../HttpRestController";
import cors from 'cors';
import http from "http";

export default class ExpressServer implements Server {
    private server;
    private httpServer;

    constructor(
        directoryPathForPublicImages: string
    ) {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use("/public", express.static(directoryPathForPublicImages));
        this.httpServer = http.createServer(this.server);
    }

    private static createExecutable(httpRestController: HttpRestController) {
        return async function (request: Request, response: Response) {
            const req = new ExpressRequest(request);
            const res = new ExpressResponse(response);
            await httpRestController.execute(req, res);
        }
    }

    addMiddleware(middleware: Middleware): void {
        this.server.use(async (request: Request, response: Response, next: any) => {
            const req = new ExpressRequest(request);
            const res = new ExpressResponse(response);
            await middleware.execute(req, res, next);
        })
    }

    listen(port: number): void {
        this.httpServer.listen(port, () => {
            console.log(`backend webttrpg listening on port ${port}`)
        });
    }

    on(httpMethod: HttpMethod, api: string, httpRestController: HttpRestController): void {
        this.server[httpMethod](api, ExpressServer.createExecutable(httpRestController));
    }

    getHttpServer(): http.Server {
        return this.httpServer;
    }
}
