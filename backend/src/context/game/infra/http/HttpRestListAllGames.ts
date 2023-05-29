import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import ListAllGames from "../../application/ListAllGames";
import SQLGameRepository from "../repository/SQLGameRepository";

export default class HttpRestListAllGames implements HttpRestController {

    private listAllGames: ListAllGames;

    constructor() {
        this.listAllGames = new ListAllGames(
            new SQLGameRepository());
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const allGames = await this.listAllGames.execute();
            response.status(200).send({
              allGames
            });
        } catch (erro: any) {
            response.status(400).send({
                message: erro.message
            });
        }
    }
}
