import AuthenticationToken from "../entity/AuthenticationToken";

export default interface AuthenticationTokenCollection {
    registerAuthenticationToken(authenticationToken: AuthenticationToken): Promise<void>;
    getByToken(authenticationToken: string): Promise<AuthenticationToken>;
}
