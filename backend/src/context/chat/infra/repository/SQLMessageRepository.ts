import database from "../../../../infra/database";
import Message from "../../domain/entity/Message";
import MessageRepository from "../../domain/repository/MessageRepository";

type MessageTable = {
    id: string,
    message: string,
    user_id: string,
    game_id: string,
    created_at: Date,
}

export default class SQLMessageRepository implements MessageRepository {

    async add(message: Message): Promise<void> {
        await database.none("insert into webttrpg.message (id, message, user_id, game_id, created_at) values ($1, $2, $3, $4, $5)",
            [
                message.getId(),
                message.getMessage(),
                message.getUserId(),
                message.getGameId(),
                message.getCreateAt()
            ]
        );
    }

    async getAllMessagesByGameId(gameId: string): Promise<Message[]> {
        const messagesData = await database.manyOrNone("select m.*, u.username from webttrpg.message as m, webttrpg.user as u where m.user_id = u.id and m.game_id = $1", [gameId]);
        if (!messagesData) {
            return [];
        }

        const messages = messagesData.map((messageData) => {
            return new Message(messageData.id,
                messageData.message,
                messageData.user_id,
                messageData.game_id,
                messageData.created_at,
                messageData.username)
        })
        return messages;
    }
}
