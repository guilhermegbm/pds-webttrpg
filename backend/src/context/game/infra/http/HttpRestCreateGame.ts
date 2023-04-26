import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import CreateGame from "../../application/CreateGame";
import SQLGameRepository from "../repository/SQLGameRepository";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class HttpRestCreateGame {

    static async execute(request: Request, response: Response) {
        try {
            const userId = request.getBody().userId;
            const name = request.getBody().name;
            const maximumPlayers = request.getBody().maximumPlayers;
            const description = request.getBody().description;

            const actionCreateGame = new CreateGame(
                new SQLGameRepository(),
                new UuidV4IdGenerator()
            );
            await actionCreateGame.execute(name, maximumPlayers, description, userId);
            response.status(200).end()
        } catch (erro: any) {
            response.status(400).send({
                message: erro.message
            });
        }
    }
}
