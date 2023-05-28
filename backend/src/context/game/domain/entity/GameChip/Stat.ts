export default class Stat {

    private name: string;
    private value: number;

    constructor(
        name: string,
        value: number
    ) {
        this.validateName(name);
        this.name = name;
        this.value = value;
    }

    private validateName(name: string): void {
        if (!name) throw new Error("undefined name");
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): number {
        return this.value;
    }
}
