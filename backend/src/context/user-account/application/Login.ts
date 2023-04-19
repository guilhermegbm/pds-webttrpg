import AuthenticateUser from "../domain/AuthenticateUser";
import AuthenticationTokenGenerator from "../domain/AuthenticationTokenGenerator";
import AuthenticationTokenCollection from "../domain/collection/AuthenticationTokenCollection";
import UserCollection from "../domain/collection/UserCollection";
import AuthenticationToken from "../domain/entity/AuthenticationToken";

export default class Login {

    private authenticateUser: AuthenticateUser;
    private TOKEN_EXPIRATION_TIME: number = 2;

    constructor (
        readonly userCollection: UserCollection,
        readonly encryptPassword: Function,
        readonly authenticationTokenGenerator: AuthenticationTokenGenerator,
        readonly authenticationTokenCollection: AuthenticationTokenCollection
    ) {
        this.authenticateUser = new AuthenticateUser();
    }

    async execute(username: string, plainPassword: string) {
        const user = await this.userCollection.getByUsername(username);
        if (!user) {
            throw new Error("user not found");
        }
        this.validatePlainPassword(plainPassword);
        this.authenticateUser.authenticate(user, plainPassword, this.encryptPassword);
        const token = this.authenticationTokenGenerator.generate();
        const authenticateToken = new AuthenticationToken(token, user, this.TOKEN_EXPIRATION_TIME);
        this.authenticationTokenCollection.registerAuthenticationToken(authenticateToken);
        return authenticateToken.getToken();
    }

    private validatePlainPassword(plainPassword: string) {
        if (plainPassword == null 
            || plainPassword == undefined
            || plainPassword === ""
        ) {
            throw new Error("password is empty");
        }
    }
}