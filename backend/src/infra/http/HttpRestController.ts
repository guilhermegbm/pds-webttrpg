import Request from "./Request";
import Response from "./Response";

export default interface HttpRestController {
    execute(request: Request, response: Response): Promise<void>;
}