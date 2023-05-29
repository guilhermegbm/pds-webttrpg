import Game from "../domain/Game";
import GameRepository from "../domain/GameRepository";

export default class ListAllGames {

    constructor(
        readonly gameRepository: GameRepository
    ) {}

    async execute(): Promise<Game[]> {

        const allGames = await this.gameRepository.listAll();

        return allGames;
    }
}