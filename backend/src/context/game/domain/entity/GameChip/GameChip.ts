import Game from "../../Game";
import Player from "../../Player";
import Enchantment from "./Enchantment";
import Inventory from "./Inventory";
import Skill from "./Skill";
import Stat from "./Stat";

export default class GameChip {

    private id: string | null;
    private game: Game;
    private name: string;
    private level: number;
    private clazz: string;
    private imageName: string;
    private ownerPlayer: Player;
    private stats: Stat[];
    private inventorys: Inventory[];
    private skills: Skill[];
    private enchantment: Enchantment[];
    private playersEditPermission: Player[];

    constructor(
        id: string | null,
        game: Game,
        name: string,
        level: number,
        clazz: string,
        imageName: string,
        ownerPlayer: Player
    ) {
        this.validateName(name);
        this.id = id;
        this.game = game;
        this.name = name;
        this.level = level;
        this.clazz = clazz;
        this.imageName = imageName;
        this.ownerPlayer = ownerPlayer;
        this.stats = [];
        this.inventorys = [];
        this.skills = [];
        this.enchantment = [];
        this.playersEditPermission = []
    }

    private validateName(name: string): void {
        if (!name) throw new Error("undefined name");
    }

    public addStat(stat: Stat): void {
        this.stats.push(stat)
    }

    public addInventory(inventory: Inventory): void {
        this.inventorys.push(inventory);
    }

    public addSkill(skill: Skill): void {
        this.skills.push(skill)
    }

    public addPlayer(player: Player): void {
        this.playersEditPermission.push(player);
    }

    public addEnchantment(enchantment: Enchantment): void {
        this.enchantment.push(enchantment);
    }

    public getId(): string | null {
        return this.id;
    }

    public getGame(): Game {
        return this.game;
    }

    public getName(): string {
        return this.name;
    }

    public getLevel(): number {
        return this.level;
    }

    public getClazz(): string {
        return this.clazz;
    }

    public getImageName(): string {
        return this.imageName;
    }

    public getOwnerPlayer(): Player {
        return this.ownerPlayer;
    }

    public getStats(): Stat[] {
        return this.stats;
    }

    public getInventorys(): Inventory[] {
        return this.inventorys;
    }

    public getSkills(): Skill[] {
        return this.skills;
    }

    public getEnchantment(): Enchantment[] {
        return this.enchantment;
    }

    public getPlayersEditPermission(): Player[] {
        return this.playersEditPermission;
    }
}
