import GetIfAuthenticationTokenIsValid from "../../../context/user-account/application/GetIfAuthenticationTokenIsValid";
import GetUserByAuthenticationToken from "../../../context/user-account/application/GetUserByAuthenticationToken";
import SQLAuthenticationTokenRepository from "../../../context/user-account/infra/repository/SQLAuthenticationTokenRepository";
import SQLUserRepository from "../../../context/user-account/infra/repository/SQLUserRepository";
import Middleware from "../Middleware";
import Request from "../Request";
import Response from "../Response";

export default class MiddlewareAuthenticationTokenValidation implements Middleware {

    async execute(request: Request, response: Response, next: any): Promise<void> {
        try {
            const authenticationToken = request.getBody().authenticationToken;

            const getIfAuthenticationTokenIsValid = new GetIfAuthenticationTokenIsValid(new SQLAuthenticationTokenRepository());
            const authTokenIsValid = await getIfAuthenticationTokenIsValid.execute(authenticationToken);
            if (!authTokenIsValid) {
                response.status(403).send({
                    message: "access not allowed"
                });
                return;
            }

            const getUserByAuthenticationToken = new GetUserByAuthenticationToken(
                new SQLUserRepository(),
                new SQLAuthenticationTokenRepository()
            );
            const user = await getUserByAuthenticationToken.execute(authenticationToken);
            request.getBody().userId = user.getId();
            next();
        } catch (erro: any) {
            response.status(400).send({
                message: erro.message
            });
        }
    }
}