import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import SignUp from "../../application/SignUp";
import SQLUserRepository from "../repository/SQLUserRepository";
import BcryptEncryptPassword from "../service/BcryptEncryptPassword";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class HttpRestSignUp implements HttpRestController {

    private signUp: SignUp;

    constructor() {
        this.signUp = new SignUp(
            new SQLUserRepository(),
            new BcryptEncryptPassword(),
            new UuidV4IdGenerator());
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const confirmationPassword = request.getBody().confirmationPassword;
            await this.signUp.execute(username, password, confirmationPassword);
            response.status(200).end();
        } catch (erro: any) {
            response.status(404).send({
                message: erro.message
            });
        }
    }
}