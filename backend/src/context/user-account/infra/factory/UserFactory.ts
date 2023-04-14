import User from "../../domain/entity/User";

export default class UserFactory {
    static create(id: string, username: string, encryptedPassword: string) {
        const user = new User(id, username, encryptedPassword);
        return user;
    }
}