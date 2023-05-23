import Message from "../entity/Message";

export default interface MessageRepository {
    add(message: Message): Promise<void>;
    getAllMessagesByGameId(gameId: string): Promise<Message[]>;
}
