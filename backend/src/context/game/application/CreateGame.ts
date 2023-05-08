import Game from "../domain/Game";
import GameRepository from "../domain/GameRepository";
import IdGenerator from "../domain/IdGenerator";

export default class CreateGame {

    constructor(
        readonly gameRepository: GameRepository,
        readonly idGenerator: IdGenerator
    ) {}

    async execute(name: string,
        maximumPlayers: number,
        description: string, 
        userId: string
    ) {
        if (!name) throw new Error("invalid game name");

        const game = await this.gameRepository.getByName(name);
        if (game) throw new Error("game name already used");

        const gameId = this.idGenerator.generate();
        const newGame = new Game(
            gameId,
            name,
            maximumPlayers,
            description,
            userId
        );
        await this.gameRepository.add(newGame);
    }
}