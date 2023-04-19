import UserCollection from "../../domain/collection/UserCollection";
import User from "../../domain/entity/User";
import UserFactory from "../factory/UserFactory";
import database from "../../../../infra/database";

export default class UserRepository implements UserCollection {
    
    async getByUsername(username: string): Promise<User> {
        const userData = await database.oneOrNone("select * from webttrpg.user where username = $1", [username]);
        const user = UserFactory.create(userData.id, userData.username, userData.password);
        return user;
    }
}
