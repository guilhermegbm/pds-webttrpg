export default class User {
    
    private id: string;
    private username: string;
    private encryptedPassword: string;

    constructor (
        id: string,
        username: string,
        encryptedPassword: string
    ) { 
        this.validateEncryptedPassword(encryptedPassword);
        this.validateUsername(username);
        this.id = id;
        this.username = username;
        this.encryptedPassword = encryptedPassword;
    }

    private validateEncryptedPassword(encryptedPassword: string) {
        if (encryptedPassword == null || encryptedPassword == undefined || encryptedPassword == "") {
            throw new Error("invalid encrypted password");
        }
    }

    private validateUsername(username: string) {
        if (username == null || username == undefined || username == "") {
            throw new Error("invalid encrypted password");
        }
    }

    getId(): string {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEncryptedPassword(): string {
        return this.encryptedPassword;
    }
}