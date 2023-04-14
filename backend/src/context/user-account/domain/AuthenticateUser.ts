import User from "./entity/User";

export default class AuthenticateUser {
    authenticate(user: User, plainPassword: string, encryptPassword: Function) {
        const encryptedPlainPassword = encryptPassword(plainPassword);
        if (encryptedPlainPassword !== user.getEncryptedPassword()) {
            throw new Error("incorrect password");
        }
    }
}
