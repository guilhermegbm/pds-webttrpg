import GetAllMessagesFromAGame from "../../application/GetAllMessagesFromAGame";
import SQLGameUserRepository from "../repository/SQLGameUserRepository";
import SQLMessageRepository from "../repository/SQLMessageRepository";
import GameChatSocketEmit from "./GameChatSocketEmit";

export default class BuildAllGameChatSocketEmit {

    static async build(): Promise<GameChatSocketEmit[]> {
        const getAllMessagesFromAGame: GetAllMessagesFromAGame = new GetAllMessagesFromAGame(
            new SQLMessageRepository()
        );
        const allGames = await new SQLGameUserRepository().getAllGameId();
        const gameChatSocketsEmit = allGames.map(async gameId => {
            const allMessages = await getAllMessagesFromAGame.execute(gameId);
            return new GameChatSocketEmit(
                `previus-${gameId}`,
                allMessages
            );
        });
        return await Promise.all(gameChatSocketsEmit);
    }
}
