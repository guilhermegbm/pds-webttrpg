import SignIn from "../../../context/user-account/application/SignIn"
import AuthenticationToken from "../../../context/user-account/domain/entity/AuthenticationToken"
import User from "../../../context/user-account/domain/entity/User"
import AuthenticationTokenRepository from "../../../context/user-account/domain/repository/AuthenticationTokenRepository"
import UserRepository from "../../../context/user-account/domain/repository/UserRepository"
import AuthenticationTokenGenerator from "../../../context/user-account/domain/service/AuthenticationTokenGenerator"
import EncryptPassword from "../../../context/user-account/domain/service/EncryptPassword"

class MockUserRepository implements UserRepository {
  async getById(id: string): Promise<User> {
    if (id == "user-id") {
      return new User("my-id", "my-username", "my password but encrypted")
    }
    throw new Error("User not found by id: " + id)
  }
  async getByUsername(username: string): Promise<User> {
    if (username == "my-username") {
      return new User("my-id", "my-username", "my password but encrypted")
    }
    return null!
  }
  async existByUsername(username: string): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  async save(user: User): Promise<void> {
    throw new Error("Method not implemented.")
  }
}

class MockEncryptPassword implements EncryptPassword {
  async encrypt(password: string): Promise<string> {
    return password + " but encrypted"
  }
  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return (password + " but encrypted") == encryptedPassword
  }
}

class MockAuthenticationTokenGenerator implements AuthenticationTokenGenerator {
  generate(): string {
    return "new-token"
  }
}

class MockAuthenticationTokenRepository implements AuthenticationTokenRepository {

  async registerAuthenticationToken(authenticationToken: AuthenticationToken): Promise<void> {
    // Do nothing
  }

  async getByToken(authenticationToken: string): Promise<AuthenticationToken> {
    throw new Error("Method not implemented.")
  }
}

let userRepository: UserRepository
let encryptPassword: EncryptPassword
let authenticationTokenGenerator: AuthenticationTokenGenerator
let authenticationTokenRepository: AuthenticationTokenRepository
let signIn: SignIn
beforeAll(() => {
  userRepository = new MockUserRepository()
  encryptPassword = new MockEncryptPassword()
  authenticationTokenGenerator = new MockAuthenticationTokenGenerator()
  authenticationTokenRepository = new MockAuthenticationTokenRepository()
  signIn = new SignIn(userRepository, encryptPassword, authenticationTokenGenerator, authenticationTokenRepository)
})

describe("SignIn", () => {

  it("should sign in a valid user and return its data", async () => {
    const username = "my-username"
    const password = "my password"
    const signInData = await signIn.execute(username, password)
    expect(signInData).toEqual({ userId: "my-id", token: "new-token" })
  })

  test("that an inexistent user (an inexistent username) can't sign in", async () => {
    const username = "inexistent-username"
    const password = "inexistent-password"
    await expect(signIn.execute(username, password)).rejects.toThrow("user not found")
  })

  test("that an existent user but with a wrong password can't sign in", async () => {
    const username = "my-username"
    const password = "wrong password"
    await expect(signIn.execute(username, password)).rejects.toThrow("incorrect password")
  })
})