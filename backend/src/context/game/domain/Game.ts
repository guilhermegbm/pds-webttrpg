export default class Game {

    private id: string;
    private name: string;
    private maximumPlayers: number;
    private description: string;
    private userId: string;
    private startDate: Date;
    private createdAt: Date;
    private imgMapBase64: string;

    constructor(
        id: string,
        name: string,
        maximumPlayers: number,
        description: string,
        userId: string,
        startDate: Date,
        createdAt: Date | null,
        imgMapBase64: string
    ) {
        this.validateName(name);
        this.validateMaximumPlayers(maximumPlayers);
        this.validateDescription(description);
        if (createdAt === null) {
            this.validateStartDate(startDate);
        }
        this.validateMapImage(imgMapBase64)

        this.id = id;
        this.name = name;
        this.maximumPlayers = maximumPlayers;
        this.description = description;
        this.userId = userId;
        this.startDate = startDate;
        this.createdAt = createdAt == null ? new Date() : createdAt;
        this.imgMapBase64 = imgMapBase64;
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
        if (!startDate) throw new Error("undefined start date");
    }

    private validateMapImage(imgMapBase64: string): void {
      if (!imgMapBase64 || imgMapBase64 == "") throw new Error("undefined image");

      if (!imgMapBase64.startsWith("data:image/png;base64,")) throw new Error("Invalid image format");
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

    public getImgMapBase64() {
        return this.imgMapBase64;
    }
}