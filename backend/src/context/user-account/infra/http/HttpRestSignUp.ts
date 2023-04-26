import UserRepository from "../repository/UserRepository";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import BcryptEncryptPassword from "../service/BcryptEncryptPassword";
import SignUp from "../../application/SignUp";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class HttpRestSignUp {

    static async execute(request: Request, response: Response) {
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
            response.status(200).end();
        } catch (erro: any) {
            response.status(404).send({
                message: erro.message
            });
        }
    }
}