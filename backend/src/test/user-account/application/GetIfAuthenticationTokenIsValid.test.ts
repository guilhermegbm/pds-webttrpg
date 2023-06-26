import GetIfAuthenticationTokenIsValid from "../../../context/user-account/application/GetIfAuthenticationTokenIsValid"
import AuthenticationToken from "../../../context/user-account/domain/entity/AuthenticationToken"
import User from "../../../context/user-account/domain/entity/User"
import AuthenticationTokenRepository from "../../../context/user-account/domain/repository/AuthenticationTokenRepository"

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
      return new AuthenticationToken("invalid-token", new User("user-id", "user-username", "user-encripted-pass"), threeHoursAgo, 1)
    }
    throw new Error("Authentication token not found: " + authenticationToken)
  }

}

let authenticationTokenRepository: AuthenticationTokenRepository
let getIfAuthenticationTokenIsValid: GetIfAuthenticationTokenIsValid
beforeAll(() => {
  authenticationTokenRepository = new MockAuthenticationTokenRepository()
  getIfAuthenticationTokenIsValid = new GetIfAuthenticationTokenIsValid(authenticationTokenRepository)
})

describe("GetIfAuthenticationTokenIsValid", () => {
  it("should authenticate a valid token", async () => {
    const token = "valid-token"
    const tokenIsValid = await getIfAuthenticationTokenIsValid.execute(token)
    expect(tokenIsValid).toEqual(true)
  })

  it("should NOT authenticate an invalid token", async () => {
    const token = "invalid-token"
    const tokenIsValid = await getIfAuthenticationTokenIsValid.execute(token)
    expect(tokenIsValid).toEqual(false)
  })
})