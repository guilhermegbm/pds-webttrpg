import User from "../entity/User";

export default interface UserCollection {
    getByUsername(username: string): Promise<User>;
    existByUsername(username: string): Promise<boolean>
    save(user: User): Promise<void>;
}