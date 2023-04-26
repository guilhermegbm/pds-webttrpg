import AuthenticationTokenRepository from "../domain/repository/AuthenticationTokenRepository";
import AuthenticationToken from "../domain/entity/AuthenticationToken";

export default class GetIfAuthenticationTokenIsValid {

    constructor(
        readonly authenticationTokenRepository: AuthenticationTokenRepository
    ) {}

    async execute(authenticationToken: string): Promise<boolean> {
        const authToken: AuthenticationToken = await this.authenticationTokenRepository.getByToken(authenticationToken);
        return authToken.isValid();
    }
}