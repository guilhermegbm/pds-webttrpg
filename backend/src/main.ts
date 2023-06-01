import GameChatSocketOn from "./context/chat/infra/socket/GameChatSocketOn";
import GameRoutes from "./context/game/infra/http/GameRoutes";
import UserAccountRoutes from "./context/user-account/infra/http/UserAccountRoutes"
import ExpressServer from "./infra/http/express/ExpressServer"
import MiddlewareAuthenticationTokenValidation from "./infra/http/middleware/MiddlewareAuthenticationTokenValidation";
import SocketIOWebServer from "./infra/socket/socketIO/SocketIOWebServer";

// Configurações servidor http
const server = new ExpressServer()
UserAccountRoutes.defineRoutes(server);
server.addMiddleware(new MiddlewareAuthenticationTokenValidation());
GameRoutes.defineRoutes(server);
server.listen(3000);

// Configurações servidor socket
const socketServer = new SocketIOWebServer(
    server.getHttpServer(),
    "http://localhost:8080"
);
socketServer.connect([new GameChatSocketOn()]);
