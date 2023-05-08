import GameRoutes from "./context/game/infra/http/GameRoutes";
import UserAccountRoutes from "./context/user-account/infra/http/UserAccountRoutes"
import ExpressServer from "./infra/http/express/ExpressServer"
import MiddlewareAuthenticationTokenValidation from "./infra/http/middleware/MiddlewareAuthenticationTokenValidation";

const server = new ExpressServer()
UserAccountRoutes.defineRoutes(server);
server.addMiddleware(new MiddlewareAuthenticationTokenValidation());
GameRoutes.defineRoutes(server);
server.listen(3000);
