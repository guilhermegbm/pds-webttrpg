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
beforeAll(() => {
  encryptPassword = new MockEncryptPassword()
})

describe("AuthenticateUser", () => {
  it("should authenticate a valid User", async () => {
    const user = new User("my-id", "my-username", "my password but encrypted")
    const plainPassword = "my password"
    await new AuthenticateUser().authenticate(user, plainPassword, encryptPassword);
    expect(true).toBe(true)
  })

  it("should not authenticate an invalid User", async () => {
    const user = new User("my-id", "my-username", "my password but encrypted")
    const plainPassword = "my incorrect password"
    const authenticator = new AuthenticateUser();
    await expect(authenticator.authenticate(user, plainPassword, encryptPassword)).rejects.toThrow("incorrect password")
  })
})