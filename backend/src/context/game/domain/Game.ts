export default class Game {

    private id: string;
    private name: string;
    private maximumPlayers: number;
    private description: string;
    private userId: string;
    private startDate: Date;
    private createdAt: Date;

    constructor(
        id: string,
        name: string,
        maximumPlayers: number,
        description: string,
        userId: string,
        startDate: Date,
        createdAt: Date | null
    ) {
        this.validateName(name);
        this.validateMaximumPlayers(maximumPlayers);
        this.validateDescription(description);
        this.validateStartDate(startDate);

        this.id = id;
        this.name = name;
        this.maximumPlayers = maximumPlayers;
        this.description = description;
        this.userId = userId;
        this.startDate = startDate;
        this.createdAt = createdAt == null ? new Date() : createdAt;
    }

    private validateName(name: string): void {
        if (!name) throw new Error("undefined name");
    }

    private validateMaximumPlayers(maximumPlayers: number): void {
        if (!maximumPlayers) throw new Error("undefined maximum players");
        if (maximumPlayers < 1) throw new Error("negative maximum number of players");
    }

    private validateDescription(description: string): void {
        if (!description) throw new Error("undefined description");
    }

    private validateStartDate(startDate: Date): void {
        const currentDate = new Date();
        if (startDate.getTime() <= currentDate.getTime()) {
            throw new Error("the start date of the game cannot be in the past");
        }
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getMaximumPlayers() {
        return this.maximumPlayers;
    }

    public getDescription() {
        return this.description;
    }

    public getUserId() {
        return this.userId;
    }

    public getStartDate() {
        return this.startDate;
    }

    public getCreatedAt() {
        return this.createdAt;
    }
}