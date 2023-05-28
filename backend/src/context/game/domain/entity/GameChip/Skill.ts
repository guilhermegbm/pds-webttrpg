export default class Skill {

    private name: string;
    private description: string;

    constructor(
        name: string,
        description: string
    ) {
        this.validateName(name);
        this.name = name;
        this.description = description;
    }

    private validateName(name: string): void {
        if (!name) throw new Error("undefined name");
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }
}