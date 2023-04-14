import User from "./User";

export default class AuthenticationToken {

    private token: string;
    private user: User;
    private createdAt: Date;
    private expirationTimeInHours: number;

    constructor(token: string, user: User, expirationTimeInHours: number) {
        this.token = token;
        this.user = user;
        this.createdAt = new Date();
        this.expirationTimeInHours = expirationTimeInHours;
    }

    getToken(): string {
        return this.token;
    }

    getUser(): User {
        return this.user;
    }

    getCreateAt(): Date {
        return this.createdAt;
    }

    getExpirationTimeInHours(): number {
        return this.expirationTimeInHours;
    }
}