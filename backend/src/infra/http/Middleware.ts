import Request from "./Request";
import Response from "./Response";

export default interface Middleware {
    execute(request: Request, response: Response, next: any): Promise<void>;
}