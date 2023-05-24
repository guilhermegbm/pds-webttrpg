export default class Message {

    private id: string|null;
    private message: string;
    private userId: string;
    private gameId: string;
    private createdAt: Date;
    private userName: string

    constructor(
        id: string|null,
        message: string,
        userId: string,
        gameId: string,
        createdAt: Date,
        userName: string
    ) {
        this.validateMessage(message);
        this.id = id;
        this.message = message;
        this.userId = userId;
        this.gameId = gameId;
        this.createdAt = createdAt == null ? new Date() : createdAt;
        this.userName = userName;
    }

    private validateMessage(message: string) {
        if (!message) throw new Error("undefined message");
    }

    public getId(): string|null {
        return this.id;
    }

    public getMessage(): string {
        return this.message;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getGameId(): string {
        return this.gameId;
    }

    public getCreateAt(): Date {
        return this.createdAt;
    }

    public getUserName(): string {
        return this.userName;
    }
}
