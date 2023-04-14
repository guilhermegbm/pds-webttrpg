import AuthenticateUser from "../domain/AuthenticateUser";
import AuthenticationTokenGenerator from "../domain/AuthenticationTokenGenerator";
import AuthenticationTokenCollection from "../domain/collection/AuthenticationTokenCollection";
import UserCollection from "../domain/collection/UserCollection";

export default class Login {

    private authenticateUser: AuthenticateUser;

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

        const authenticateToken = this.authenticationTokenGenerator.generate();
        this.authenticationTokenCollection.registerAuthenticationTokenForUser(authenticateToken, user.getId());

        return authenticateToken;
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