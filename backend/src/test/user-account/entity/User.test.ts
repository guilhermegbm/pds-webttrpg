import User from "../../../context/user-account/domain/entity/User";

describe("User", () => {
  it("should construct a valid User", () => {
    const user = new User("my-id", "my-username", "my-encripted-pass")
    expect(user).toEqual({ id: "my-id", username: "my-username", encryptedPassword: "my-encripted-pass" })
  })

  it("should try to build an invalid User with no Username", () => {
    expect(() => new User("my-id", "", "my-encripted-pass")).toThrow("invalid username")
  })

  it("should try to build an invalid User with no Encrypted Password", () => {
    expect(() => new User("my-id", "my-username", "")).toThrow("invalid encrypted password")
  })
})