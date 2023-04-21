import User from "./entity/User";

export default class AuthenticateUser {
    authenticate(user: User, plainPassword: string, encryptPassword: Function) {
        this.validatePlainPassword(plainPassword); 
        const encryptedPlainPassword = encryptPassword(plainPassword);
        if (encryptedPlainPassword !== user.getEncryptedPassword()) {
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
