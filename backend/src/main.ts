import UserAccountRoutes from "./context/user-account/infra/http/UserAccountRoutes"
import ExpressServer from "./infra/http/express/ExpressServer"
import Request from "./infra/http/Request";
import Response from "./infra/http/Response";
import { HttpMethod } from "./infra/http/Server";

const server = new ExpressServer()

server.on(HttpMethod.GET, "/", (req: Request, res: Response) => { 
    res.status(200).send({
        message: "backend webttrpg running"
    });
});

server.listen(3000);