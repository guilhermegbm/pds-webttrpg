import { Response as ResponseExpress} from "express";
import Response from "../Response";

export default class ExpressResponse implements Response {    
    private response: ResponseExpress;
    
    constructor(response: ResponseExpress) {
        this.response = response;
    }
    status(httpStatus: number): Response {
        this.response.status(httpStatus);
        return this;
    }
    send(result: object): void {
        this.response.send(result);
    }
    end(): void {
        this.response.end();
    }
}
