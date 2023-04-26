import UserCollection from "../../domain/repository/UserCollection";
import User from "../../domain/entity/User";
import UserFactory from "../factory/UserFactory";
import database from "../../../../infra/database";

export default class UserRepository implements UserCollection {

    async getById(id: string): Promise<User> {
        const userData = await database.oneOrNone("select * from webttrpg.user where id = $1", [id]);
        if (!userData) {
            throw new Error("user not found");
        }
        const user = UserFactory.create(userData.id, userData.username, userData.password);
        return user;
    }

    async getByUsername(username: string): Promise<User> {
        const userData = await database.oneOrNone("select * from webttrpg.user where username = $1", [username]);
        if (!userData) {
            throw new Error("user not found");
        }
        const user = UserFactory.create(userData.id, userData.username, userData.password);
        return user;
    }

    async save(user: User): Promise<void> {
        await database.none("insert into webttrpg.user (id, username, password) values ($1, $2, $3)", [
            user.getId(),
            user.getUsername(),
            user.getEncryptedPassword()
        ]);
    }

    async existByUsername(username: string): Promise<boolean> {
        const data = await database.oneOrNone("select count(*) from webttrpg.user where username = $1", [username]);
        return data.count !== "0" ? true : false;
    }
}
