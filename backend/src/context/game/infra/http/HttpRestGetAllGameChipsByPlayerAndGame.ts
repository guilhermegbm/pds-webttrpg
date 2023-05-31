import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import GetAllGameChipsByPlayerAndGame from "../../application/GetAllGameChipsByPlayerAndGame";
import SQLGameChipRepository from "../repository/SQLGameChipRepository";

export default class HttpRestGetAllGameChipsByPlayerAndGame implements HttpRestController {
    
    private getAllGameChipsByPlayerAndGame: GetAllGameChipsByPlayerAndGame;
 
    constructor() {
        this.getAllGameChipsByPlayerAndGame = new GetAllGameChipsByPlayerAndGame(
            new SQLGameChipRepository()
        );
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const userId = request.getBody().userId;
            const gameId = request.getParams().id;
            const gameChips = await this.getAllGameChipsByPlayerAndGame.execute(gameId, userId);
            response.status(200).send(gameChips);
        } catch (erro: any) {
            console.error(erro.stack);
            response.status(400).send({
                message: erro.message
            });
        }
    }
}
