export default interface UserRepository {
    getUsernameById(id: string): Promise<string>;
}