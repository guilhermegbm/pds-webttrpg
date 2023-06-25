import AuthenticateUser from "../../../context/user-account/domain/service/AuthenticateUser"
import User from "../../../context/user-account/domain/entity/User";
import EncryptPassword from "../../../context/user-account/domain/service/EncryptPassword";

class MockEncryptPassword implements EncryptPassword {

  async encrypt(password: string): Promise<string> {
    return password + " but encrypted"
  }

  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return (password + " but encrypted") == encryptedPassword
  }

}

let encryptPassword: EncryptPassword
let user: User

beforeAll(() => {
  encryptPassword = new MockEncryptPassword()
  user = new User("my-id", "my-username", "my password but encrypted")
})

describe("AuthenticateUser", () => {
  test("if invalid password is invalidated", async () => {
    const invalidPlainPassword = ""
    const authenticator = new AuthenticateUser();
    await expect(authenticator.authenticate(user, invalidPlainPassword, encryptPassword)).rejects.toThrow("password is empty")
  })

  it("should authenticate a valid User", async () => {
    const plainPassword = "my password"
    await new AuthenticateUser().authenticate(user, plainPassword, encryptPassword);
    expect(true).toBe(true)
  })

  it("should not authenticate an invalid User", async () => {
    const plainPassword = "my incorrect password"
    const authenticator = new AuthenticateUser();
    await expect(authenticator.authenticate(user, plainPassword, encryptPassword)).rejects.toThrow("incorrect password")
  })
})