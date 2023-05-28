export default class Enchantment {

    private name: string;
    private castingTime: string;
    private range: string;
    private duration: string;
    private concentration: boolean;
    private description: string;
    private level: number;

    constructor(
        name: string,
        castingTime: string,
        range: string,
        duration: string,
        concentration: boolean,
        description: string,
        level: number
    ) {
        this.validateName(name);
        this.name = name;
        this.castingTime = castingTime;
        this.range = range;
        this.duration = duration;
        this.concentration = concentration;
        this.description = description;
        this.level = level;
    }

    private validateName(name: string): void {
        if (!name) throw new Error("undefined name");
    }

    public getName() {
        return this.name;
    }

    public getCastingTime() {
        return this.castingTime;
    }

    public getRange() {
        return this.range;
    }

    public getDuration() {
        return this.duration;
    }

    public getConcentration() {
        return this.concentration;
    }

    public getDescription() {
        return this.description;
    }

    public getLevel() {
        return this.level;
    }
}
