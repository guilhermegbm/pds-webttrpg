import SocketEmit from "../../../../infra/socket/SocketEmit";

export default class GameChatSocketEmit implements SocketEmit {
    
    constructor(
        readonly id: string,
        readonly messages: any[]
    ) {}

    public getId(): string {
        return this.id;
    }

    public allMessages(): any[] {
        return this.messages;
    }
}
