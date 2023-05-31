import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import DeleteGameChip from "../../application/game-chip/DeleteGameChip";
import SQLGameChipRepository from "../repository/SQLGameChipRepository";

export default class HttpRestDeleteGameChip implements HttpRestController {
    
    private deleteGameChip: DeleteGameChip;

    constructor() {
        this.deleteGameChip = new DeleteGameChip(
            new SQLGameChipRepository()
        );
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const userId = request.getBody().userId;
            const gameId = request.getParams().game_id;
            const gameChipId = request.getParams().game_chip_id;
            await this.deleteGameChip.execute(gameChipId, gameId, userId);
            response.status(200).end();
        } catch (erro: any) {
            console.error(erro.stack);
            response.status(400).send({
                message: erro.message
            });
        }
    }
}
