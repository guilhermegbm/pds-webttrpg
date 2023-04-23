import SignIn from "../../application/Login";
import UserRepository from "../repository/UserRepository";
import UuidV4AuthenticationTokenGenerator from "../service/UuidV4AuthenticationTokenGenerator";
import AuthenticationTokenRepository from "../repository/AuthenticationTokenRepository";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import BcryptEncryptPassword from "../service/BcryptEncryptPassword";
import SignUp from "../../application/SignUp";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class UserAccountController {

    static async signIn(request: Request, response: Response) {
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const signin = new SignIn(
                new UserRepository(),
                new BcryptEncryptPassword(),
                new UuidV4AuthenticationTokenGenerator(),
                new AuthenticationTokenRepository());
            const authenticationToken = await signin.execute(username, password);
            response.status(200).send({ authenticationToken });
        } catch (erro: any) {
            response.status(404).send({ message: erro.message });
        }
    }

    static async signUp(request: Request, response: Response) {
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const confirmationPassword = request.getBody().confirmationPassword;
            const signUp = new SignUp(
                new UserRepository(),
                new BcryptEncryptPassword(),
                new UuidV4IdGenerator()
            )
            await signUp.execute(username, password, confirmationPassword);
            response.status(200).send({});
        } catch (erro: any) {
            response.status(404).send({ message: erro.message });
        }
    }
}