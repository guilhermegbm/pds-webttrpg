import AuthenticationTokenGenerator from "../../domain/AuthenticationTokenGenerator";

export default class AuthenticationTokenGeneratorService implements AuthenticationTokenGenerator {
    generate(): string {
        return "token-example"
    }
}
