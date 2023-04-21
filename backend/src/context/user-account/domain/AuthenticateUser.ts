import EncryptPassword from "./EncryptPassword";
import User from "./entity/User";

export default class AuthenticateUser {
    async authenticate(user: User, plainPassword: string, encryptPassword: EncryptPassword) {
        this.validatePlainPassword(plainPassword);
        const equals = await encryptPassword.compare(plainPassword, user.getEncryptedPassword());
        if (!equals) {
            throw new Error("incorrect password");
        }
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
