import AuthenticationTokenGenerator from "../domain/AuthenticationTokenGenerator";
import AuthenticationTokenCollection from "../domain/collection/AuthenticationTokenCollection";
import UserCollection from "../domain/collection/UserCollection";

export default class Login {

    constructor (
        readonly userCollection: UserCollection,
        readonly encryptPassword: Function,
        readonly authenticationTokenGenerator: AuthenticationTokenGenerator,
        readonly authenticationTokenCollection: AuthenticationTokenCollection
    ) {}

    async execute(username: string, plainPassword: string) {
        const user = await this.userCollection.getByUsername(username);
        if (!user) {
            throw new Error("user not found");
        }
        this.validatePassword(user.getEncryptedPassword(), plainPassword, this.encryptPassword);
        const authenticateToken = this.authenticationTokenGenerator.generate();
        this.authenticationTokenCollection.registerAuthenticationTokenForUser(authenticateToken, user.getId());
        return authenticateToken;
    }

    private validatePassword(encryptedPassword: string,
        plainPassword: string,
        encryptPassword: Function
    ) {
        this.checkIfThePasswordIsEmpty(encryptedPassword);
        this.checkIfThePasswordIsEmpty(plainPassword);

        const encryptedPlainPassword = encryptPassword(plainPassword);
        if (encryptedPlainPassword !== encryptedPassword) {
            throw new Error("incorrect password");
        }
    }

    private checkIfThePasswordIsEmpty(password: string) {
        if (password == null 
            || password == undefined
            || password === ""
        ) {
            throw new Error("password is empty");
        }
    }
}