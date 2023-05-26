import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import GetAllPlayersByGame from "../../application/GetAllPlayersByGame";
import SQLPlayerRepository from "../repository/SQLPlayerRepository";

export default class HttpRestGetAllPlayersByGame implements HttpRestController {
    
    private getAllPlayersByGame: GetAllPlayersByGame;

    constructor() {
        this.getAllPlayersByGame = new GetAllPlayersByGame(
            new SQLPlayerRepository()
        );
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const gameId = request.getParams().id;
            const players = await this.getAllPlayersByGame.execute(gameId);
            response.status(200).send(players);
        } catch (erro: any) {
            response.status(400).send({
                message: erro.message
            });
        }
    }
}
