import GameChip from "../../domain/entity/GameChip/GameChip";
import GameChipRepository from "../../domain/repository/GameChipRepository";

export default class GetAllGameChipsByPlayerAndGame {

    constructor(
        readonly gameChipRepository: GameChipRepository
    ) {}

    async execute(gameId: string, playerId: string): Promise<GameChip[]> {
        const gameChips = await this.gameChipRepository.getByGameIdAndPlayerId(gameId, playerId);
        return gameChips; 
    }
}
