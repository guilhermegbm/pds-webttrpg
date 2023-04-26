import GetIfAuthenticationTokenIsValid from "../../../context/user-account/application/GetIfAuthenticationTokenIsValid";
import SQLAuthenticationTokenRepository from "../../../context/user-account/infra/repository/SQLAuthenticationTokenRepository";
import Middleware from "../Middleware";
import Request from "../Request";
import Response from "../Response";

export default class MiddlewareAuthenticationTokenValidation implements Middleware {
    async execute(request: Request, response: Response, next: any): Promise<void> {
        try {
            const authenticationToken = request.getBody().authenticationToken;
            const getIfAuthenticationTokenIsValid = new GetIfAuthenticationTokenIsValid(new SQLAuthenticationTokenRepository());
            const authenticationTokenIsValid = await getIfAuthenticationTokenIsValid.execute(authenticationToken);
            if (authenticationTokenIsValid) {
                next();
            } else {
                response.status(403).send({
                    message: "access not allowed"
                });
            }
        } catch (erro: any) {
            response.status(400).send({
                message: erro.message
            });
        }
    }
}