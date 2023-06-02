import GameRepository from "../../domain/GameRepository";
import PlayerRepository from "../../domain/PlayerRepository";
import Enchantment from "../../domain/entity/GameChip/Enchantment";
import GameChip from "../../domain/entity/GameChip/GameChip";
import Inventory from "../../domain/entity/GameChip/Inventory";
import Skill from "../../domain/entity/GameChip/Skill";
import Stat from "../../domain/entity/GameChip/Stat";
import GameChipRepository from "../../domain/repository/GameChipRepository";
import GamePlayerRepository from "../../domain/repository/GamePlayerRepository";
import GameChipInput from "./GameChipInput";

export default class CreateGameChip {

    constructor (
        readonly gameRepository: GameRepository,
        readonly playerRepository: PlayerRepository,
        readonly gameChipRepository: GameChipRepository,
        readonly gamePlayerRepository: GamePlayerRepository
    ) {}

    async execute(gameChipInput: GameChipInput): Promise<void> {
        if (!gameChipInput.ownerPlayerId) throw new Error("invalid owner player id!");
        if (!gameChipInput.gameId) throw new Error("invalid game id!");
        if (!gameChipInput.name) throw new Error("invalid game chip name!");

        const game = await this.gameRepository.getById(gameChipInput.gameId);
        if (!game) {
            throw new Error("game id not found");
        }

        if (game.getUserId() !== gameChipInput.ownerPlayerId) {
            throw new Error("game does not belong to the owner player!");
        }
        const ownerPlayer: any = await this.playerRepository.getById(gameChipInput.ownerPlayerId);
        
        const gameChip = new GameChip(
            null,
            game,
            gameChipInput.name,
            gameChipInput.level,
            gameChipInput.clazz,
            gameChipInput.imageName,
            ownerPlayer
        );
        this.addStatsInGameChip(gameChip, gameChipInput);
        this.addSkillsInGameChip(gameChip, gameChipInput);
        this.addInventorysInGameChip(gameChip, gameChipInput);
        this.addEnchantmentsInGameChip(gameChip, gameChipInput);
        await this.addPlayersInGameChip(gameChip, gameChipInput);

        const existGameChip = await this.gameChipRepository.exist(gameChip.getName(),
            gameChip.getOwnerPlayer().getId(),
            gameChip.getGame().getId()
        );
        if (existGameChip) {
            throw new Error("there is already a game sheet with this name, owner and game");
        }
        await this.gameChipRepository.add(gameChip);
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