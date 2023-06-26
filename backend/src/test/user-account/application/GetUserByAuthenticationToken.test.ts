import GetUserByAuthenticationToken from "../../../context/user-account/application/GetUserByAuthenticationToken"
import AuthenticationToken from "../../../context/user-account/domain/entity/AuthenticationToken"
import User from "../../../context/user-account/domain/entity/User"
import AuthenticationTokenRepository from "../../../context/user-account/domain/repository/AuthenticationTokenRepository"
import UserRepository from "../../../context/user-account/domain/repository/UserRepository"

class MockAuthenticationTokenRepository implements AuthenticationTokenRepository {

  async registerAuthenticationToken(authenticationToken: AuthenticationToken): Promise<void> {
    throw new Error("Method not implemented.")
  }

  async getByToken(authenticationToken: string): Promise<AuthenticationToken> {
    let threeHoursAgo = new Date()
    threeHoursAgo.setTime(threeHoursAgo.getTime() + (-3 * 60 * 60 * 1000))

    if (authenticationToken == "valid-token") {
      // Will expire after 4 hours, so OK
      return new AuthenticationToken("valid-token", new User("user-id", "user-username", "user-encripted-pass"), threeHoursAgo, 4)
    } else if (authenticationToken == "invalid-token") {
      // Will expire after 1 hour, so NOT OK
      return new AuthenticationToken("invalid-token", new User("other-user-id", "other-user-username", "other-user-encripted-pass"), threeHoursAgo, 1)
    }
    throw new Error("Authentication token not found: " + authenticationToken)
  }

}

class MockUserRepository implements UserRepository {
  async getById(id: string): Promise<User> {
    if (id == "user-id") {
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

let authenticationTokenRepository: AuthenticationTokenRepository
let userRepository: UserRepository
let getUserByAuthenticationToken: GetUserByAuthenticationToken
beforeAll(() => {
  authenticationTokenRepository = new MockAuthenticationTokenRepository()
  userRepository = new MockUserRepository()
  getUserByAuthenticationToken = new GetUserByAuthenticationToken(userRepository, authenticationTokenRepository)
})


describe("GetUserByAuthenticationToken", () => {
  it("should get user with a valid token", async () => {
    const token = "valid-token"
    const user = await getUserByAuthenticationToken.execute(token)
    expect(user).toEqual({ id: "my-id", username: "my-username", encryptedPassword: "my-encripted-pass" })
  })

  it("should raise Exception after trying to get user with an invalid token", async () => {
    const token = "invalid-token"
    await expect(getUserByAuthenticationToken.execute(token)).rejects.toThrow("invalid authentication token")
  })
})