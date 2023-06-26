import SignUp from "../../../context/user-account/application/SignUp"
import User from "../../../context/user-account/domain/entity/User"
import UserRepository from "../../../context/user-account/domain/repository/UserRepository"
import EncryptPassword from "../../../context/user-account/domain/service/EncryptPassword"
import IdGenerator from "../../../context/user-account/domain/service/IdGenerator"

const mockSaveFunction = jest.fn(user => { });

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
    return await this.getByUsername(username) != null
  }
  async save(user: User): Promise<void> {
    mockSaveFunction(user)
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

class MockIdGenerator implements IdGenerator {
  generate(): string {
    return "new-id"
  }
}

let userRepository: UserRepository
let encryptPassword: EncryptPassword
let idGenerator: MockIdGenerator
let signUp: SignUp
beforeAll(() => {
  userRepository = new MockUserRepository()
  encryptPassword = new MockEncryptPassword()
  idGenerator = new MockIdGenerator()
  signUp = new SignUp(userRepository, encryptPassword, idGenerator)
})

describe("SignUp", () => {

  it("should throw exception on invalid empty password", async () => {
    const username = "new-username"
    const password = ""
    const confirmationPassword = "new-password"
    await expect(signUp.execute(username, password, confirmationPassword)).rejects.toThrow("password has not defined")
  })

  it("should throw exception on invalid empty confirmation password", async () => {
    const username = "new-username"
    const password = "new-password"
    const confirmationPassword = ""
    await expect(signUp.execute(username, password, confirmationPassword)).rejects.toThrow("confirmation password has not defined")
  })

  it("should throw exception on different password and confirmation password", async () => {
    const username = "new-username"
    const password = "new-password"
    const confirmationPassword = "different-conf-password"
    await expect(signUp.execute(username, password, confirmationPassword)).rejects.toThrow("passwords do not match")
  })

  it("should throw exception because a user with this username already exists", async () => {
    const username = "my-username"
    const password = "my-password"
    const confirmationPassword = "my-password"
    await expect(signUp.execute(username, password, confirmationPassword)).rejects.toThrow("user already registered")
  })

  test("that a user signs up successfully", async () => {
    const username = "new-username"
    const password = "new-password"
    const confirmationPassword = "new-password"

    await signUp.execute(username, password, confirmationPassword)

    // Asserting that the save function was called once
    expect(mockSaveFunction.mock.calls).toHaveLength(1);

    // Asserting that the save function received the correct User instance
    expect(mockSaveFunction.mock.calls[0][0]).toEqual({ id: "new-id", username: "new-username", encryptedPassword: "new-password but encrypted" });
  })
})