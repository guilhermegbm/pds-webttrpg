export default class User {
    
    private id: string;
    private username: string;
    private encryptedPassword: string;

    constructor (
        id: string,
        username: string,
        encryptedPassword: string
    ) { 
        this.id = id;
        this.username = username;
        this.encryptedPassword = encryptedPassword;
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