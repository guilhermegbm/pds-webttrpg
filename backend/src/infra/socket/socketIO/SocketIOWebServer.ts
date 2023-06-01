import SocketWebServer from "../SocketWebServer";
import http from "http";
import SocketIO from "socket.io";
import SocketOn from "../SocketOn";
import BuildAllGameChatSocketEmit from "../../../context/chat/infra/socket/BuildAllGameChatSocketEmit";

export default class SocketIOWebServer implements SocketWebServer {

    private socketWebServer;

    constructor(
        httpServer: http.Server,
        baseUrl: string,
    ) {
        this.socketWebServer = new SocketIO.Server(httpServer, {
            cors: {
                origin: baseUrl,
                methods: ["GET", "POST"]
            },
            allowEIO3: true
        });
    }

    connect(socketsOn: SocketOn[]): void {
        this.socketWebServer.on("connection", socket => {

            BuildAllGameChatSocketEmit.build().then(socketEmits => {
                socketEmits.forEach(socketEmit => {
                    socket.emit(socketEmit.getId(), socketEmit.allMessages());
                });
            });

            socketsOn.forEach(socketOn => {
                socket.on(socketOn.getId(), async data => {
                    const response = await socketOn.process(data);
                    const broadcastId = socketOn.getBroadcastId(data);
                    socket.broadcast.emit(broadcastId, response);
                });
            });
        });
    }
}
