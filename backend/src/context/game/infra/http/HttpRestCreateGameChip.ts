import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import CreateGameChip from "../../application/game-chip/CreateGameChip";
import GameChipInput from "../../application/game-chip/GameChipInput";
import SQLGameChipRepository from "../repository/SQLGameChipRepository";
import SQLGamePlayerRepository from "../repository/SQLGamePlayerRepository";
import SQLGameRepository from "../repository/SQLGameRepository";
import SQLPlayerRepository from "../repository/SQLPlayerRepository";

export default class HttpRestCreateGameChip implements HttpRestController {

    private createGameChip: CreateGameChip;

    constructor() {
        this.createGameChip = new CreateGameChip(
            new SQLGameRepository(),
            new SQLPlayerRepository(),
            new SQLGameChipRepository(),
            new SQLGamePlayerRepository()
        );
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const gameChipInput = this.buildGameChipInput(request);
            await this.createGameChip.execute(gameChipInput);
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
        const gameId = request.getParams().id;
        const name = request.getBody().name;
        const level = request.getBody().level;
        const clazz = request.getBody().class;
        const stats = request.getBody().stats;
        const inventorys = request.getBody().inventorys;
        const skills = request.getBody().skills;
        const enchantments = request.getBody().enchantments;
        const playersEditPermission = request.getBody().playersEditPermission;

        return new GameChipInput(null,
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