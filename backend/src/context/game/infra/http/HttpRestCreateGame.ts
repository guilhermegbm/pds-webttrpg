import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import CreateGame from "../../application/CreateGame";
import SQLGamePlayerRepository from "../repository/SQLGamePlayerRepository";
import SQLGameRepository from "../repository/SQLGameRepository";
import UuidV4IdGenerator from "../service/UuidV4IdGenerator";

export default class HttpRestCreateGame implements HttpRestController {

    private createGame: CreateGame;

    constructor() {
        this.createGame = new CreateGame(
            new SQLGameRepository(),
            new UuidV4IdGenerator(),
            new SQLGamePlayerRepository()
        );
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const userId = request.getBody().userId;
            const name = request.getBody().name;
            const maximumPlayers = request.getBody().maximumPlayers;
            const description = request.getBody().description;
            const startDate = new Date(request.getBody().startDate);
            const imgMapBase64 = request.getBody().base64MapImage;

            await this.createGame.execute(
                name,
                maximumPlayers,
                description,
                userId,
                startDate,
                imgMapBase64
            );
            response.status(200).end()
        } catch (erro: any) {
            response.status(400).send({
                message: erro.message
            });
        }
    }
}
