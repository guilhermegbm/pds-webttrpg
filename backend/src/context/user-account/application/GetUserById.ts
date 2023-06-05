import User from "../domain/entity/User";
import UserRepository from "../domain/repository/UserRepository";

export default class GetUserById {
  constructor(
    readonly userRepository: UserRepository
  ) { }

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.getById(userId);
    return user
  }
}