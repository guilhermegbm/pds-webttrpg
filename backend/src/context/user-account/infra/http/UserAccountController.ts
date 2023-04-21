import Login from "../../application/Login";
import UserRepository from "../repository/UserRepository";
import AuthenticationTokenGeneratorService from "../service/AuthenticationTokenGeneratorService";
import AuthenticationTokenRepository from "../repository/AuthenticationTokenRepository";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";

export default class UserAccountController {

    static async signin(request: Request, response: Response) {        
        try {
            const username = request.getBody().username;
            const password = request.getBody().password;
            const signin = new Login(
                new UserRepository(),
                (password: any) => password,
                new AuthenticationTokenGeneratorService(),
                new AuthenticationTokenRepository());
            const authenticationToken = await signin.execute(username, password);
            response.status(200).send({ authenticationToken });
        } catch (erro: any) {
            response.status(404).send({ message: erro.message });
        }
    }
}