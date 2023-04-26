import AuthenticationTokenRepository from "../domain/repository/AuthenticationTokenRepository";
import AuthenticationToken from "../domain/entity/AuthenticationToken";
import UserRepository from "../domain/repository/UserRepository";
import User from "../domain/entity/User";

export default class GetUserByAuthenticationToken {

    constructor(
        readonly userRepository: UserRepository,
        readonly authenticationTokenRepository: AuthenticationTokenRepository
    ) {}

    async execute(authenticationToken: string): Promise<User> {
        const authToken: AuthenticationToken = await this.authenticationTokenRepository.getByToken(authenticationToken);
        if (authToken.isValid()) {
            const user = await this.userRepository.getById(authToken.getUser().getId());
            return user;
        }
        throw new Error("invalid authentication token");
    }
}
