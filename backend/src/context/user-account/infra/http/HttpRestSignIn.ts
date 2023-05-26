import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import SignIn from "../../application/SignIn";
import SQLAuthenticationTokenRepository from "../repository/SQLAuthenticationTokenRepository";
import SQLUserRepository from "../repository/SQLUserRepository";
import BcryptEncryptPassword from "../service/BcryptEncryptPassword";
import UuidV4AuthenticationTokenGenerator from "../service/UuidV4AuthenticationTokenGenerator";

export default class HttpRestSignIn implements HttpRestController {

    private signIn: SignIn;

    constructor() {
        this.signIn = new SignIn(
            new SQLUserRepository(),
            new BcryptEncryptPassword(),
            new UuidV4AuthenticationTokenGenerator(),
            new SQLAuthenticationTokenRepository());
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const result = await this.signIn.execute(username, password);
            response.status(200).send({
                authenticationToken: result.token,
                userId: result.userId
            });
        } catch (erro: any) {
            response.status(404).send({
                message: erro.message
            });
        }
    }
}