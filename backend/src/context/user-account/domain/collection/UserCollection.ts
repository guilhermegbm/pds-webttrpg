import User from "../entity/User";

export default interface UserCollection {
    getByUsername(username: string): Promise<User>;
}