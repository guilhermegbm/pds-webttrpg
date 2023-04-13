import User from "./User";

export default class AuthenticationToken {

    private token: string;
    private user: User;
    private createdAr: Date;
    private expirationDate: Number;

    constructor(token: string, user: User) {
        this.token = token;
        this.user = user;
        this.createdAr = new Date();
    }

    getToken(): string {
        return this.token;
    }

    getUser(): User {
        return this.user;
    }
}