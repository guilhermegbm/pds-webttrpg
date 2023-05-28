export default class Inventory {

    private name: string;
    private quantity: number;

    constructor(
        name: string,
        quantity: number
    ) {
        this.validateName(name);
        this.validateQuantity(quantity);
        this.name = name;
        this.quantity = quantity;
    }

    private validateName(name: string): void {
        if (!name) throw new Error("undefined name");
    }

    private validateQuantity(quantity: number): void {
        if (!quantity) throw new Error("undefined name");
        if (quantity < 0) throw new Error("quantity cannot be less than zero");
    }

    public getName(): string {
        return this.name;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}