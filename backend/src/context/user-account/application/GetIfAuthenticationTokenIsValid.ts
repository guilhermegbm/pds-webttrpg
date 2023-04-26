import AuthenticationTokenCollection from "../domain/repository/AuthenticationTokenRepository";
import AuthenticationToken from "../domain/entity/AuthenticationToken";

export default class GetIfAuthenticationTokenIsValid {

    constructor(
        readonly authenticationTokenCollection: AuthenticationTokenCollection
    ) {}

    async execute(authenticationToken: string) {
        const authToken: AuthenticationToken = await this.authenticationTokenCollection.getByToken(authenticationToken);
        return authToken.isValid();
    }
}