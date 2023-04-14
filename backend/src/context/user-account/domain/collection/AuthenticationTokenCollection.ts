export default interface AuthenticationTokenCollection {
    registerAuthenticationTokenForUser(authenticationToken: string, userId: string): Promise<void>;
}
