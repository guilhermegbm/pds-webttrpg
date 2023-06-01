import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import GameChipInput from "../../application/game-chip/GameChipInput";
import UpdateGameChip from "../../application/game-chip/UpdateGameChip";
import SQLGameChipRepository from "../repository/SQLGameChipRepository";
import SQLGamePlayerRepository from "../repository/SQLGamePlayerRepository";

export default class HttpRestUpdateGame implements HttpRestController {

    private updateGameChip: UpdateGameChip;

    constructor() {
        this.updateGameChip = new UpdateGameChip(
            new SQLGameChipRepository(),
            new SQLGamePlayerRepository()
        );
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const userId = request.getBody().userId;
            const gameChipInput = this.buildGameChipInput(request);
            await this.updateGameChip.execute(gameChipInput, userId);
            response.status(200).end()
        } catch (erro: any) {
            console.error(erro.stack);
            response.status(400).send({
                message: erro.message
            });
        }
    }

    private buildGameChipInput(request: Request) {
        const userId = request.getBody().userId;
        const gameId = request.getParams().game_id;
        const gameChipId = request.getParams().game_chip_id;
        const name = request.getBody().name;
        const level = request.getBody().level;
        const clazz = request.getBody().class;
        const stats = !request.getBody().stats ? [] : request.getBody().stats;
        const inventorys = !request.getBody().inventorys ? [] : request.getBody().inventorys;
        const skills = !request.getBody().skills ? [] : request.getBody().skills;
        const enchantments = !request.getBody().enchantments ? [] : request.getBody().enchantments;
        const playersEditPermission = !request.getBody().playersEditPermission ? [] : request.getBody().playersEditPermission;

        return new GameChipInput(
            gameChipId,
            gameId,
            name,
            level,
            clazz,
            userId,
            stats,
            inventorys,
            skills,
            enchantments,
            playersEditPermission
        );
    }
}