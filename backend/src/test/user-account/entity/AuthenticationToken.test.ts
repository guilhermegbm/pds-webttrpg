import AuthenticationToken from "../../../context/user-account/domain/entity/AuthenticationToken";
import User from "../../../context/user-account/domain/entity/User";

let user: User
let date: Date
beforeAll(() => {
  user = new User("user-id", "user-username", "user-encripted-pass")
  date = new Date("2023-06-25")
})

describe("AuthenticationToken", () => {
  it("should construct a correct AuthenticationToken", () => {
    const authToken = new AuthenticationToken("token", user, date, 2)
    expect(authToken).toEqual(
      {
        token: "token",
        user: { id: "user-id", username: "user-username", encryptedPassword: "user-encripted-pass" },
        createdAt: date,
        expirationTimeInHours: 2
      }
    )
  })

  test("if getters return correct values", () => {
    const authToken = new AuthenticationToken("token", user, date, 2)

    expect(authToken.getToken()).toEqual("token");
    expect(authToken.getUser()).toEqual(user);
    expect(authToken.getCreateAt()).toEqual(date);
    expect(authToken.getExpirationTimeInHours()).toEqual(2);
  })

  it("should try to build an invalid Auth Token with invalid Expiration Time", () => {
    expect(() => new AuthenticationToken("token", user, date, -1)).toThrow("invalid expiration time in hours")
  })

  it("should try to build an invalid Auth Token with invalid User", () => {
    expect(() => new AuthenticationToken("token", null!, date, 1)).toThrow("invalid user")
  })

  it("should try to build an invalid Auth Token with invalid Token", () => {
    expect(() => new AuthenticationToken(null!, user, date, 1)).toThrow("invalid token")
  })

  test("if createdAt is not null even if passed null to constructor", () => {
    const authToken = new AuthenticationToken("token", user, null!, 2)

    expect(authToken.getCreateAt()).not.toBeNull()
  })

  test("if token is valid and NOT expired", () => {
    let threeHoursAgo = new Date()
    threeHoursAgo.setTime(threeHoursAgo.getTime() + (-3 * 60 * 60 * 1000))

    // Will expire after 4 hours, so OK
    expect(new AuthenticationToken("token", user, threeHoursAgo, 4).isValid()).toEqual(true);
  })

  test("if token is invalid and expired", () => {
    let threeHoursAgo = new Date()
    threeHoursAgo.setTime(threeHoursAgo.getTime() + (-3 * 60 * 60 * 1000))

    // Will expire after 1 hour, so NOT OK
    expect(new AuthenticationToken("token", user, threeHoursAgo, 1).isValid()).toEqual(false);
  })
})