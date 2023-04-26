import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import SignIn from "../../application/SignIn";
import AuthenticationTokenRepository from "../repository/AuthenticationTokenRepository";
import UserRepository from "../repository/UserRepository";
import BcryptEncryptPassword from "../service/BcryptEncryptPassword";
import UuidV4AuthenticationTokenGenerator from "../service/UuidV4AuthenticationTokenGenerator";

export default class HttpRestSignIn {

    static async execute(request: Request, response: Response) {
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const signin = new SignIn(
                new UserRepository(),
                new BcryptEncryptPassword(),
                new UuidV4AuthenticationTokenGenerator(),
                new AuthenticationTokenRepository());
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