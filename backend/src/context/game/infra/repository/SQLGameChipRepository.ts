import database from "../../../../infra/database";
import Player from "../../domain/Player";
import Enchantment from "../../domain/entity/GameChip/Enchantment";
import GameChip from "../../domain/entity/GameChip/GameChip";
import Inventory from "../../domain/entity/GameChip/Inventory";
import Skill from "../../domain/entity/GameChip/Skill";
import Stat from "../../domain/entity/GameChip/Stat";
import GameChipRepository from "../../domain/repository/GameChipRepository";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class SQLGameChipRepository implements GameChipRepository {

    private uuidV4IdGenerator: UuidV4IdGenerator;

    constructor() {
        this.uuidV4IdGenerator = new UuidV4IdGenerator();
    }

    async exist(
        gameChipName: string,
        ownerPlayerId: string,
        gameId: string
    ): Promise<boolean> {
        const result = await database.one("select count(*) as total from webttrpg.game_chip where user_id = $1 and game_id = $2 and name = $3",
            [
                ownerPlayerId,
                gameId,
                gameChipName
            ]
        );
        return result.total > 0;
    }

    async add(gameChip: GameChip): Promise<void> {
        const gameChipId = this.uuidV4IdGenerator.generate();
        await database.none("insert into webttrpg.game_chip (id, name, level, class, game_id, user_id) values ($1, $2, $3, $4, $5, $6)",
            [
                gameChipId,
                gameChip.getName(),
                gameChip.getLevel(),
                gameChip.getClazz(),
                gameChip.getGame().getId(),
                gameChip.getOwnerPlayer().getId()
            ]
        );
        const promiseStats = this.saveGameChipStats(gameChip.getStats(), gameChipId);
        const promiseSkills = this.saveGameChipSkills(gameChip.getSkills(), gameChipId);
        const promiseInventorys = this.saveGameChipInventorys(gameChip.getInventorys(), gameChipId);
        const promiseEnchantments = this.saveGameChipEnchantments(gameChip.getEnchantment(), gameChipId);
        const promisePlayers = this.saveGameChipPlayers(gameChip.getPlayersEditPermission(), gameChipId);

        await Promise.all([
            promiseStats,
            promiseSkills,
            promiseInventorys,
            promiseEnchantments,
            promisePlayers
        ]);
    }

    private async saveGameChipPlayers(players: Player[], gameChipId: string) {
        for (const player of players) {
            this.saveGameChipPlayer(
                player,
                gameChipId
            );
        }
    }

    private async saveGameChipPlayer(player: Player, gameChipId: string): Promise<void> {
        await database.none("insert into webttrpg.game_chip_user (user_id, game_chip_id, created_at) values ($1, $2, $3)",
            [
                player.getId(),
                gameChipId,
                new Date()
            ]
        );
    }

    private async saveGameChipStats(stats: Stat[], gameChipId: string) {
        for (const stat of stats) {
            this.saveGameChipStat(
                this.uuidV4IdGenerator.generate(),
                stat,
                gameChipId
            );
        }
    }

    private async saveGameChipStat(statId: string,
        stat: Stat,
        gameChipId: string
    ): Promise<void> {
        await database.none("insert into webttrpg.game_chip_stat (id, name, value, game_chip_id) values ($1, $2, $3, $4)",
            [
                statId,
                stat.getName(),
                stat.getValue(),
                gameChipId
            ]
        );
    }

    private async saveGameChipSkills(skills: Skill[], gameChipId: string) {
        for (const skill of skills) {
            this.saveGameChipSkill(
                this.uuidV4IdGenerator.generate(),
                skill,
                gameChipId
            );
        }
    }

    private async saveGameChipSkill(skillId: string,
        skill: Skill,
        gameChipId: string
    ): Promise<void> {
        await database.none("insert into webttrpg.game_chip_skill (id, name, description, game_chip_id) values ($1, $2, $3, $4)",
            [
                skillId,
                skill.getName(),
                skill.getDescription(),
                gameChipId
            ]
        );
    }

    private async saveGameChipInventorys(inventorys: Inventory[], gameChipId: string) {
        for (const inventory of inventorys) {
            this.saveGameChipInventory(
                this.uuidV4IdGenerator.generate(),
                inventory,
                gameChipId
            );
        }
    }

    private async saveGameChipInventory(inventoryId: string,
        inventory: Inventory,
        gameChipId: string
    ): Promise<void> {
        await database.none("insert into webttrpg.game_chip_inventory (id, name, quantity, game_chip_id) values ($1, $2, $3, $4)",
            [
                inventoryId,
                inventory.getName(),
                inventory.getQuantity(),
                gameChipId
            ]
        );
    }

    private async saveGameChipEnchantments(enchantments: Enchantment[], gameChipId: string) {
        for (const enchantment of enchantments) {
            this.saveGameChipEnchantment(
                this.uuidV4IdGenerator.generate(),
                enchantment,
                gameChipId
            )
        }
    }

    private async saveGameChipEnchantment(enchantmentId: string,
        enchantment: Enchantment,
        gameChipId: string
    ): Promise<void> {
        await database.none("insert into webttrpg.game_chip_enchantment (id, name, castingTime, range, duration, concentration, description, level, game_chip_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [
                enchantmentId,
                enchantment.getName(),
                enchantment.getCastingTime(),
                enchantment.getRange(),
                enchantment.getDuration(),
                enchantment.getConcentration(),
                enchantment.getDescription(),
                enchantment.getLevel(),
                gameChipId
            ]
        );
    }

}