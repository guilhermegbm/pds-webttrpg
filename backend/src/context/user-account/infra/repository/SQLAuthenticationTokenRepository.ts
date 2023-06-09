import AuthenticationTokenCollection from "../../domain/repository/AuthenticationTokenRepository";
import database from "../../../../infra/database";
import AuthenticationToken from "../../domain/entity/AuthenticationToken";
import SQLUserRepository from "./SQLUserRepository";

export default class SQLAuthenticationTokenRepository implements AuthenticationTokenCollection {

    private sqlUserRepository: SQLUserRepository = new SQLUserRepository();

    async registerAuthenticationToken(authenticationToken: AuthenticationToken): Promise<void> {
        await database.none("insert into webttrpg.authentication_token (token, user_id, created_at, expiration_time_in_hours) values ($1, $2, $3, $4)",
            [
                authenticationToken.getToken(),
                authenticationToken.getUser().getId(),
                authenticationToken.getCreateAt(),
                authenticationToken.getExpirationTimeInHours()
            ]
        );
    }

    async getByToken(token: string): Promise<AuthenticationToken> {
        const authenticationTokenData = await database.oneOrNone("select * from webttrpg.authentication_token where token = $1", [token]);
        if (!authenticationTokenData) throw new Error("authentication token not found");

        const userId = authenticationTokenData.user_id;
        const user = await this.sqlUserRepository.getById(userId);

        const authenticationToken = new AuthenticationToken(
            authenticationTokenData.token,
            user,
            new Date(authenticationTokenData.created_at),
            authenticationTokenData.expiration_time_in_hours);

        return authenticationToken;
    }
}
