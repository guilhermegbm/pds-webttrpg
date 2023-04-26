import User from "../entity/User";

export default interface UserRepository {
    getByUsername(username: string): Promise<User>;
    existByUsername(username: string): Promise<boolean>
    save(user: User): Promise<void>;
}