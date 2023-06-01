import SocketOn from "../../../../infra/socket/SocketOn";
import SendMessage from "../../application/SendMessage";
import SQLGameUserRepository from "../repository/SQLGameUserRepository";
import SQLMessageRepository from "../repository/SQLMessageRepository";
import SQLUserRepository from "../repository/SQLUserRepository";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class GameChatSocketOn implements SocketOn {

    private sendMessage: SendMessage;

    constructor() {
        this.sendMessage = new SendMessage(
            new SQLMessageRepository(),
            new SQLGameUserRepository(),
            new SQLUserRepository(),
            new UuidV4IdGenerator()
        );
    }

    getId(): string {
        return "game-chat-send-message";
    }

    getBroadcastId(data: any): string {
        return data.gameId;
    }

    async process(data: any): Promise<any> {
        try {
            const userId = data.userId;
            const gameId = data.gameId;
            const message = data.message;
            const output: any = await this.sendMessage.execute(userId, gameId, message);
            return {
                userId,
                userName: output.username,
                gameId,
                messageId: output.messageId,
                message,
                hasError: false
            };
        } catch (erro: any) {
            return {
                hasError: true,
                message: erro.message
            }
        }
    }
}
