import Enchantment from "../../domain/entity/GameChip/Enchantment";
import GameChip from "../../domain/entity/GameChip/GameChip";
import Inventory from "../../domain/entity/GameChip/Inventory";
import Skill from "../../domain/entity/GameChip/Skill";
import Stat from "../../domain/entity/GameChip/Stat";
import GameChipRepository from "../../domain/repository/GameChipRepository";
import GamePlayerRepository from "../../domain/repository/GamePlayerRepository";
import GameChipInput from "./Input";

export default class UpdateGameChip {

    constructor(
        readonly gameChipRepository: GameChipRepository,
        readonly gamePlayerRepository: GamePlayerRepository
    ) {}

    async execute(gameChipInput: GameChipInput, playerId: string): Promise<GameChip> {
        if (!gameChipInput.id) throw new Error("game chip id not found");

        const gameChipPersisted: any = await this.gameChipRepository.getById(gameChipInput.id)
        if (!gameChipPersisted) {
            throw new Error("game chip not found");
        }
        this.validateOwnerPlayer(gameChipPersisted, playerId);

        const gameChip = new GameChip(
            gameChipPersisted.getId(),
            gameChipPersisted.getGame(),
            gameChipInput.name,
            gameChipInput.level,
            gameChipInput.clazz,
            gameChipPersisted.getOwnerPlayer()
        );

        this.addStatsInGameChip(gameChip, gameChipInput);
        this.addSkillsInGameChip(gameChip, gameChipInput);
        this.addInventorysInGameChip(gameChip, gameChipInput);
        this.addEnchantmentsInGameChip(gameChip, gameChipInput);
        await this.addPlayersInGameChip(gameChip, gameChipInput);

        return await this.gameChipRepository.update(gameChip);
    }

    private validateOwnerPlayer(gameChip: GameChip, playerId: string) {
        const playerWithPermission = gameChip.getPlayersEditPermission().filter(player => {
            return player.getId() === playerId;
        });
        if (gameChip.getOwnerPlayer().getId() !== playerId && playerWithPermission.length === 0) {
            throw new Error("player is not allowed to change game chip");
        }
    }

    private addStatsInGameChip(gameChip: GameChip, gameChipInput: GameChipInput): void {
        gameChipInput.stats.forEach(stat => {
            gameChip.addStat(new Stat(stat.name, stat.value));
        });        
    }

    private addSkillsInGameChip(gameChip: GameChip, gameChipInput: GameChipInput): void {
        gameChipInput.skills.forEach(skill => {
            gameChip.addSkill(new Skill(skill.name, skill.description));
        });
    }

    private addInventorysInGameChip(gameChip: GameChip, gameChipInput: GameChipInput): void {
        gameChipInput.inventorys.forEach(inventory => {
            gameChip.addInventory(new Inventory(inventory.name, inventory.quantity));
        });
    }

    private addEnchantmentsInGameChip(gameChip: GameChip, gameChipInput: GameChipInput): void {
        gameChipInput.enchantments.forEach(enchantment => {
            gameChip.addEnchantment(new Enchantment(enchantment.name,
                enchantment.castingTime,
                enchantment.range,
                enchantment.duration,
                enchantment.concentration,
                enchantment.description,
                enchantment.level)
            );
        });
    }

    private async addPlayersInGameChip(gameChip: GameChip, gameChipInput: GameChipInput): Promise<void> {
        const players = [...gameChipInput.playersEditPermission];
        for (const playerId of players) {
            const player = await this.gamePlayerRepository.getPlayerByPlayerIdAndGameId(playerId, gameChipInput.gameId);
            if (!player) {
                throw new Error("player does not belong to the game!");
            }
            gameChip.addPlayer(player);
        }
    }
}
