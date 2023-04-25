import User from "./User";

export default class AuthenticationToken {

    private token: string;
    private user: User;
    private createdAt: Date;
    private expirationTimeInHours: number;

    constructor(token: string, user: User, expirationTimeInHours: number) {
        this.validateExpirationTimeInHours(expirationTimeInHours);
        this.validateUser(user);
        this.validateToken(token);
        this.token = token;
        this.user = user;
        this.createdAt = new Date();
        this.expirationTimeInHours = expirationTimeInHours;
    }

    private validateExpirationTimeInHours(expirationTimeInHours: number) {
        if (!expirationTimeInHours || expirationTimeInHours < 0) {
            throw new Error("invalid expiration time in hours");
        }
    }

    private validateUser(user: User) {
        if (user == null || user == undefined) throw new Error("invalid user");
    }

    private validateToken(token: string) {
        if (!token) throw new Error("invalid token");
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

    private getExpirationTimeInMilliseconds(): number {
        return (this.expirationTimeInHours+1) * 1000 * 60 * 60;
    }

    isValid() {
        const now = new Date();
        const tokenValidity = new Date(this.createdAt.getTime() + this.getExpirationTimeInMilliseconds());
        if (tokenValidity.getTime() >= now.getTime()) {
            return true;
        }
        return false;
    }
}