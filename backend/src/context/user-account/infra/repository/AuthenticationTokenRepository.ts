import AuthenticationTokenCollection from "../../domain/collection/AuthenticationTokenCollection";
import database from "../../../../infra/database";
import AuthenticationToken from "../../domain/entity/AuthenticationToken";

export default class AuthenticationTokenRepository implements AuthenticationTokenCollection {
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
}
