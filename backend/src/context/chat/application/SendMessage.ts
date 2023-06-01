import Message from "../domain/entity/Message";
import GameUserRepository from "../domain/repository/GameUserRepository";
import MessageRepository from "../domain/repository/MessageRepository";
import UserRepository from "../domain/repository/UserRepository";
import IdGenerator from "../domain/service/IdGenerator";

export default class SendMessage {

    constructor(
        readonly messageRepository: MessageRepository,
        readonly gameUserRepository: GameUserRepository,
        readonly userRepository: UserRepository,
        readonly idGenerator: IdGenerator
    ) {}

    async execute(userId: string, gameId: string, message: string): Promise<Output> {        
        if (!userId) throw new Error("undefined user id");
        if (!gameId) throw new Error("undefined game id");

        const exist = await this.gameUserRepository.userIsInTheGame(userId, gameId);
        if (!exist) {
            throw new Error("user does not belong to this game");
        }

        const messageId = this.idGenerator.generate();
        const newMessage = new Message(this.idGenerator.generate(),
            message,
            userId,
            gameId,
            new Date(), "");
        await this.messageRepository.add(newMessage);
        const username = await this.userRepository.getUsernameById(userId);
        const output = {
            username,
            messageId
        }
        return output;
    }
}

type Output = {
    username: string,
    messageId: string
}