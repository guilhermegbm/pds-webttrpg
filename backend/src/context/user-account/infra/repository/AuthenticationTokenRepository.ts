import AuthenticationTokenCollection from "../../domain/collection/AuthenticationTokenCollection";
import database from "../../../../infra/database";

export default class AuthenticationTokenRepository implements AuthenticationTokenCollection {
    async registerAuthenticationTokenForUser(authenticationToken: string, userId: string): Promise<void> {
        await database.none("insert into webttrpg.authentication_token (token, user_id) values ($1, $2)",
            [authenticationToken, userId]);
    }
}
