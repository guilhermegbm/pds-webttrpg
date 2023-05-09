import express, { Request, Response } from "express"
import Server, { HttpMethod } from "../Server";
import ExpressRequest from "./ExpressRequest";
import ExpressResponse from "./ExpressResponse";

export default class ExpressServer implements Server {
    private server;

    constructor() {
        this.server = express();
        this.server.use(express.json());
    }

    private static createExecutable(endpoint: Function) {
        return async function (request: Request, response: Response) {
            const req = new ExpressRequest(request);
            const res = new ExpressResponse(response);
            await endpoint(req, res);
        }
    }

    listen(port: number): void {
        this.server.listen(port, () => {
            console.log(`backend webttrpg listening on port ${port}`)
        })
    }

    on(httpMethod: HttpMethod, api: string, endpoint: Function): void {
        this.server[httpMethod](api, ExpressServer.createExecutable(endpoint));
    }
}
