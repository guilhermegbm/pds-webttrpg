import AuthenticationTokenGenerator from "../../domain/AuthenticationTokenGenerator";
import { uuid } from "uuidv4";

export default class AuthenticationTokenGeneratorService implements AuthenticationTokenGenerator {
    generate(): string {
        const authenticationToken = uuid();
        return authenticationToken;
    }
}
