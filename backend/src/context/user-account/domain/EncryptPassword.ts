export default interface EncryptPassword {
    encrypt(password: string): Promise<string>;
    compare(password: string, encryptedPassword: string): Promise<boolean>;
}