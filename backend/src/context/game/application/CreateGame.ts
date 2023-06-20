import Game from "../domain/entity/Game";
import GameRepository from "../domain/repository/GameRepository";
import IdGenerator from "../domain/service/IdGenerator";
import GamePlayerRepository from "../domain/repository/GamePlayerRepository";

export default class CreateGame {

    constructor(
        readonly gameRepository: GameRepository,
        readonly idGenerator: IdGenerator,
        readonly gamePlayerRepository: GamePlayerRepository
    ) {}

    async execute(name: string,
        maximumPlayers: number,
        description: string, 
        ownerplayerId: string,
        startDate: Date,
        imgMapBase64: string
    ) {
        if (!name) throw new Error("invalid game name");

        const game = await this.gameRepository.getByName(name);
        if (game) throw new Error("game name already used");

        if (!description) throw new Error("The description must not be empty");

        const currentDate = new Date();
        if (startDate.getTime() <= currentDate.getTime()) {
            throw new Error("the start date of the game cannot be in the past");
        }

        const gameId = this.idGenerator.generate();
        const newGame = new Game(
            gameId,
            name,
            maximumPlayers,
            description,
            ownerplayerId,
            startDate,
            null,
            imgMapBase64
        );
        await this.gameRepository.add(newGame);
        await this.gamePlayerRepository.add(ownerplayerId, gameId);
    }
}