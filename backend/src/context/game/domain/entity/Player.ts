export default class Player {
    
    private id: string;
    private username: string;

    constructor(
        id: string,
        username: string
    ) {
        this.id = id;
        this.username = username;
    }

    public getId() {
        return this.id;
    }

    public getUsername() {
        return this.username;
    }
}
