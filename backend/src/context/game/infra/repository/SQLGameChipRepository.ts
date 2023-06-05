import database from "../../../../infra/database";
import Game from "../../domain/Game";
import Player from "../../domain/Player";
import Enchantment from "../../domain/entity/GameChip/Enchantment";
import GameChip from "../../domain/entity/GameChip/GameChip";
import Inventory from "../../domain/entity/GameChip/Inventory";
import Skill from "../../domain/entity/GameChip/Skill";
import Stat from "../../domain/entity/GameChip/Stat";
import GameChipRepository from "../../domain/repository/GameChipRepository";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";
import SQLGameRepository from "./SQLGameRepository";
import SQLPlayerRepository from "./SQLPlayerRepository";

export default class SQLGameChipRepository implements GameChipRepository {

    private uuidV4IdGenerator: UuidV4IdGenerator;
    private sqlGameRepository: SQLGameRepository;
    private sqlPlayerRepository: SQLPlayerRepository;

    constructor() {
        this.uuidV4IdGenerator = new UuidV4IdGenerator();
        this.sqlGameRepository = new SQLGameRepository();
        this.sqlPlayerRepository = new SQLPlayerRepository();
    }

    async update(gameChip: GameChip): Promise<GameChip> {
        const gameChipId: any = gameChip.getId();
        await database.none("delete from webttrpg.game_chip_stat where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_skill where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_inventory where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_enchantment where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_user where game_chip_id = $1", [gameChipId]);

        await database.none("update webttrpg.game_chip set name = $1, level = $2, class = $3, image_name = $4 where id = $5",
            [
                gameChip.getName(),
                gameChip.getLevel(),
                gameChip.getClazz(),
                gameChip.getImageName(),
                gameChipId
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

        const gameChipSaved: any = await this.getById(gameChipId);
        return gameChipSaved;
    }

    async delete(gameChipId: string): Promise<void> {
        await database.none("delete from webttrpg.game_chip_stat where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_skill where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_inventory where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_enchantment where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip_user where game_chip_id = $1", [gameChipId]);
        await database.none("delete from webttrpg.game_chip where id = $1", [gameChipId]);
    }

    async getById(gameChipId: string): Promise<GameChip | null> {
        const gameChipData = await database.oneOrNone("select * from webttrpg.game_chip where id = $1", [gameChipId]);
        if (!gameChipData) {
            return null;
        }
        const game: Game | null = await this.sqlGameRepository.getById(gameChipData.game_id);
        if (!game) throw new Error("game not found");

        return (await this.getByGameAndGameChipsData(game , [gameChipData]))[0];
    }

    async getByGameIdAndPlayerId(gameId: string, playerId: string): Promise<GameChip[]> {
        
        const gameChipsData = await database.manyOrNone("select * from webttrpg.game_chip where game_id = $1", [gameId]);
        if (!gameChipsData) {
            return [];
        }
        const game: Game | null = await this.sqlGameRepository.getById(gameId);
        if (!game) throw new Error("game not found");
        
        if (game?.getUserId() === playerId) {
            return await this.getByGameAndGameChipsData(game, gameChipsData);
        } else {
            const gameChipsId = gameChipsData.map(gameChipData => gameChipData.id);
            const gameChipUsersData = await database.manyOrNone("select game_chip_id from webttrpg.game_chip_user where user_id = $1 and game_chip_id in ($2:csv)",
                [
                    playerId,
                    gameChipsId
                ]
            );
            if (!gameChipUsersData) {
                return [];
            }
            const gameChipsDataFiltered = gameChipsData.filter((gameChipData) => {
                return gameChipUsersData.includes(gameChipData.id);
            });
            return await this.getByGameAndGameChipsData(game, gameChipsDataFiltered);
        }
    }

    private async getByGameAndGameChipsData(game: Game, gameChipsData: any[]): Promise<GameChip[]> {

        const player: any = await this.sqlPlayerRepository.getById(game.getUserId());
        const gameChips: GameChip[] = [];
        for (const gameChipData of gameChipsData) {            

            const gameChip = new GameChip(
                gameChipData.id,
                game,
                gameChipData.name,
                gameChipData.level,
                gameChipData.class,
                gameChipData.image_name,
                player
            );

            (await this.getStatsByGameChipId(gameChipData.id)).forEach(stat => gameChip.addStat(stat));
            (await this.getInventorysByGameChipId(gameChipData.id)).forEach(inventory => gameChip.addInventory(inventory));
            (await this.getSkillsByGameChipId(gameChipData.id)).forEach(skill => gameChip.addSkill(skill));
            (await this.getEnchantmentsByGameChipId(gameChipData.id)).forEach(enchantment => gameChip.addEnchantment(enchantment));
            (await this.getPlayersByGameChipId(gameChipData.id)).forEach(player => gameChip.addPlayer(player));

            gameChips.push(gameChip);
        }
        return gameChips;
    }

    private async getStatsByGameChipId(gameChipId: string): Promise<Stat[]> {
        const statsData = await database.manyOrNone("select * from webttrpg.game_chip_stat where game_chip_id = $1", [gameChipId]);
        if (!statsData) {
            return [];
        }
        return statsData.map(stat => new Stat(stat.name, stat.value));
    }

    private async getInventorysByGameChipId(gameChipId: string): Promise<Inventory[]> {
        const inventorysData = await database.manyOrNone("select * from webttrpg.game_chip_inventory where game_chip_id = $1", [gameChipId]);
        if (!inventorysData) {
            return []
        }
        return inventorysData.map(inventoryData => new Inventory(inventoryData.name, inventoryData.quantity));
    }

    private async getSkillsByGameChipId(gameChipId: string): Promise<Skill[]> {
        const skillsData = await database.manyOrNone("select * from webttrpg.game_chip_skill where game_chip_id = $1", [gameChipId]);
        if (!skillsData) {
            return []
        }
        return skillsData.map(skillData => new Skill(skillData.name, skillData.description));
    }

    private async getEnchantmentsByGameChipId(gameChipId: string): Promise<Enchantment[]> {
        const enchantmentsData = await database.manyOrNone("select * from webttrpg.game_chip_enchantment where game_chip_id = $1", [gameChipId]);
        if (!enchantmentsData) {
            return []
        }
        return enchantmentsData.map(enchantmentData => new Enchantment(enchantmentData.name,
            enchantmentData.castingTime,
            enchantmentData.range,
            enchantmentData.duration,
            enchantmentData.concentration,
            enchantmentData.description,
            enchantmentData.leve)
        );
    }

    private async getPlayersByGameChipId(gameChipId: string): Promise<Player[]> {
        const playersData = await database.manyOrNone("select * from webttrpg.game_chip_user where game_chip_id = $1", [gameChipId]);
        if (!playersData) {
            return [];
        }
        const players: any = playersData.map(async (playerData) => {
            const player = await this.sqlPlayerRepository.getById(playerData.user_id);
            return player;
        });
        return await Promise.all(players);
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
        await database.none("insert into webttrpg.game_chip (id, name, level, class, image_name, game_id, user_id) values ($1, $2, $3, $4, $5, $6, $7)",
            [
                gameChipId,
                gameChip.getName(),
                gameChip.getLevel(),
                gameChip.getClazz(),
                gameChip.getImageName(),
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
