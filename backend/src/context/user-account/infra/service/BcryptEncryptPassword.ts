import EncryptPassword from "../../domain/EncryptPassword";
import bcrypt from "bcrypt";

export default class BcryptEncryptPassword implements EncryptPassword {

    async encrypt(password: string): Promise<string> {
        const SALT_ROUNDS = 10;
        const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return encryptedPassword;
    }

    async compare(password: string, encryptedPassword: string): Promise<boolean> {
        const equals = await bcrypt.compare(password, encryptedPassword);
        return equals;
    }
}
