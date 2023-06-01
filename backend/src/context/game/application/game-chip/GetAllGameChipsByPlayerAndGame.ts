import Enchantment from "../../domain/entity/GameChip/Enchantment";
import GameChip from "../../domain/entity/GameChip/GameChip";
import GameChipRepository from "../../domain/repository/GameChipRepository";
import OutputGameChip, {
    GameChipEnchantmentsOutput,
    GameChipInventoryOutput,
    GameChipSkillsOutput, 
    GameChipStatsOutput
} from "./OutputGameChip";

export default class GetAllGameChipsByPlayerAndGame {

    constructor(
        readonly gameChipRepository: GameChipRepository
    ) {}

    async execute(gameId: string, playerId: string): Promise<OutputGameChip[]> {
        const gameChips = await this.gameChipRepository.getByGameIdAndPlayerId(gameId, playerId);
        return gameChips.map(this.buildOutputGameChip);
    }

    private buildOutputGameChip(gameChip: GameChip): OutputGameChip {
        const gameChipId: any = gameChip.getId();
        const playersEditPermission = gameChip.getPlayersEditPermission().map(player => player.getId())

        const statsOutput = gameChip.getStats().map(stat => new GameChipStatsOutput(stat.getName(), stat.getValue()));
        const inventorys = gameChip.getInventorys().map(inventory => new GameChipInventoryOutput(inventory.getName(), inventory.getQuantity()));
        const skills = gameChip.getSkills().map(skill => new GameChipSkillsOutput(skill.getName(), skill.getDescription()));
        const enchantments = gameChip.getEnchantment().map(GetAllGameChipsByPlayerAndGame.buildEnchantmentOutput);

        return new OutputGameChip(
            gameChipId,
            gameChip.getName(),
            gameChip.getLevel(),
            gameChip.getClazz(),
            statsOutput,
            inventorys,
            skills,
            enchantments,
            playersEditPermission
        );
    }

    private static buildEnchantmentOutput(enchantment: Enchantment): GameChipEnchantmentsOutput {
        return new GameChipEnchantmentsOutput(
            enchantment.getName(),
            enchantment.getCastingTime(),
            enchantment.getRange(),
            enchantment.getDuration(),
            enchantment.getConcentration(),
            enchantment.getDescription(),
            enchantment.getLevel()
        );
    }
}
