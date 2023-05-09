import EncryptPassword from "../domain/EncryptPassword";
import IdGenerator from "../domain/IdGenerator";
import UserCollection from "../domain/collection/UserCollection";
import User from "../domain/entity/User";

export default class SignUp {

    constructor(
        readonly userCollection: UserCollection,
        readonly encryptPassword: EncryptPassword,
        readonly idGenerator: IdGenerator
    ) { }

    async execute(username: string, password: string, confirmationPassword: string) {
        this.validatePassword(password, confirmationPassword);
        const existUser = await this.userCollection.existByUsername(username);
        if (existUser) {
            throw new Error("user already registered");
        }
        const userId = this.idGenerator.generate();
        const encryptedPassword = await this.encryptPassword.encrypt(password);
        const newUser: User = new User(userId, username, encryptedPassword);
        await this.userCollection.save(newUser);
    }

    private validatePassword(password: string, confirmationPassword: string) {
        if (!password) throw new Error("password has not defined");
        if (!confirmationPassword) throw new Error("confirmation password has not defined");
        if (password !== confirmationPassword) {
            throw new Error("passwords do not match");
        }
    }
}
