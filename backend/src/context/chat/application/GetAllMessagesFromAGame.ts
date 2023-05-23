import MessageRepository from "../domain/repository/MessageRepository";

export default class GetAllMessagesFromAGame {

    constructor(
        readonly messageRepository: MessageRepository
    ) {}

    async execute(gameId: string): Promise<any> {
        if (!gameId) throw new Error("game is not found");
        const messages = await this.messageRepository.getAllMessagesByGameId(gameId);
        const allMessages = messages.map(message => ({
            userId: message.getUserId(),
            userName: message.getUserName(),
            message: message.getMessage()
        }));
        return allMessages;
    } 
}