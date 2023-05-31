import GameChatSocketOn from "./context/chat/infra/socket/GameChatSocketOn";
import GameRoutes from "./context/game/infra/http/GameRoutes";
import UserAccountRoutes from "./context/user-account/infra/http/UserAccountRoutes"
import ExpressServer from "./infra/http/express/ExpressServer"
import MiddlewareAuthenticationTokenValidation from "./infra/http/middleware/MiddlewareAuthenticationTokenValidation";
import SocketIOWebServer from "./infra/socket/socketIO/SocketIOWebServer";
import path from "path";

// Configurações servidor http
const directoryPathForPublicImages = path.join(__dirname, "..", "public");
const server = new ExpressServer(directoryPathForPublicImages);
UserAccountRoutes.defineRoutes(server);
server.addMiddleware(new MiddlewareAuthenticationTokenValidation());
GameRoutes.defineRoutes(server);
server.listen(3000);

// Configurações servidor socket
const socketServer = new SocketIOWebServer(
    server.getHttpServer(),
    "http://localhost:3000"
);
socketServer.connect([new GameChatSocketOn()]);
