import database from "../../../../infra/database";
import UserRepository from "../../domain/repository/UserRepository";

export default class SQLUserRepository implements UserRepository {
    async getUsernameById(id: string): Promise<string> {
        const userData = await database.oneOrNone("select username from webttrpg.user where id = $1", [id]);
        if (!userData) {
            throw new Error("user not found");
        }
        return userData.username;
    }
}