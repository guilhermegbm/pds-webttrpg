import GetUserById from "../../../context/user-account/application/GetUserById"
import User from "../../../context/user-account/domain/entity/User"
import UserRepository from "../../../context/user-account/domain/repository/UserRepository"

class MockUserRepository implements UserRepository {
  async getById(id: string): Promise<User> {
    if (id == "my-id") {
      return new User("my-id", "my-username", "my-encripted-pass")
    }
    throw new Error("User not found: " + id)
  }
  async getByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.")
  }
  async existByUsername(username: string): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  async save(user: User): Promise<void> {
    throw new Error("Method not implemented.")
  }
}

let userRepository: UserRepository
let getUserById: GetUserById
beforeAll(() => {
  userRepository = new MockUserRepository()
  getUserById = new GetUserById(userRepository)
})


describe("GetUserById", () => {
  it("should find an existing user", async () => {
    const id = "my-id"
    const user = await getUserById.execute(id)
    expect(user).toEqual({ id: "my-id", username: "my-username", encryptedPassword: "my-encripted-pass" })
  })

  it("should raise Exception after trying to get user with an inexistent id", async () => {
    const token = "inexistent-id"
    await expect(getUserById.execute(token)).rejects.toThrow("User not found: inexistent-id")
  })
})