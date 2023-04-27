import { Request as RequestExpress} from "express";
import Request from "../Request";

export default class ExpressRequest implements Request {
    private request: RequestExpress;

    constructor(request: RequestExpress) {
        this.request = request;
    }
    getParams() {
        return this.request.params;
    }
    getBody() {
        return this.request.body;
    }
    getHeader(key: string) {
        return this.request.header(key);
    }
}
