import AuthenticationTokenGenerator from "../../domain/service/AuthenticationTokenGenerator";
import { uuid } from "uuidv4";

export default class UuidV4AuthenticationTokenGenerator implements AuthenticationTokenGenerator {

    generate(): string {
        const authenticationToken = uuid();
        return authenticationToken;
    }
}
