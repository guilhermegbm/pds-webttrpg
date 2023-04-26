import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import SignIn from "../../application/SignIn";
import SQLAuthenticationTokenRepository from "../repository/SQLAuthenticationTokenRepository";
import SQLUserRepository from "../repository/SQLUserRepository";
import BcryptEncryptPassword from "../service/BcryptEncryptPassword";
import UuidV4AuthenticationTokenGenerator from "../service/UuidV4AuthenticationTokenGenerator";

export default class HttpRestSignIn {

    static async execute(request: Request, response: Response) {
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const signin = new SignIn(
                new SQLUserRepository(),
                new BcryptEncryptPassword(),
                new UuidV4AuthenticationTokenGenerator(),
                new SQLAuthenticationTokenRepository());
            const authenticationToken = await signin.execute(username, password);
            response.status(200).send({
                authenticationToken
            });
        } catch (erro: any) {
            response.status(404).send({
                message: erro.message
            });
        }
    }
}