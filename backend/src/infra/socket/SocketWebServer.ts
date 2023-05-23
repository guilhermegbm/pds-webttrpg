import SocketOn from "./SocketOn";

export default interface SocketWebServer {
    connect(socketConfigs: SocketOn[]): void;
}
