import GameChip from "../domain/entity/GameChip/GameChip";
import GameChipRepository from "../domain/repository/GameChipRepository";

export default class DeleteGameChip {

    constructor(
        readonly gameChipRepository: GameChipRepository
    ) {}

    async execute(gameChipId: string,
        gameId: string,
        playerId: string
    ): Promise<void> {
        if (!gameChipId) throw new Error("invalid game chip id!");
        if (!gameId) throw new Error("invalid game id!");
        if (!playerId) throw new Error("invalid player id!");

        const gameChip = await this.gameChipRepository.getById(gameChipId);        
        if (!gameChip) {
            throw new Error("game chip not found");
        }

        if (gameChip.getGame().getId() !== gameId) {
            throw new Error("game chip does not belong to the game")
        }

        if (gameChip.getOwnerPlayer().getId() !== playerId) {
            throw new Error("player does not have permission to delete game chip");
        }

        await this.gameChipRepository.delete(gameChipId);
    }
}
