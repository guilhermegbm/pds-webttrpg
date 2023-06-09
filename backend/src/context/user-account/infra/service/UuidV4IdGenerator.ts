import IdGenerator from "../../domain/service/IdGenerator";
import { uuid } from "uuidv4";

export default class UuidV4IdGenerator implements IdGenerator {

    generate(): string {
        const id = uuid();
        return id;        
    }
}
