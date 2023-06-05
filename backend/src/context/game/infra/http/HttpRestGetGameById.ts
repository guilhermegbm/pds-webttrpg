import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import GetGameById from "../../application/GetGameById";
import SQLGameRepository from "../repository/SQLGameRepository";
import SQLPlayerRepository from "../repository/SQLPlayerRepository";

export default class HttpRestGetGameById implements HttpRestController {

  private getGameById: GetGameById;

  constructor() {
    this.getGameById = new GetGameById(
      new SQLGameRepository(),
      new SQLPlayerRepository()
    )
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const gameId = request.getParams().game_id;
      const game = await this.getGameById.execute(gameId);
      response.status(200).send(game);
    } catch (erro: any) {
      console.error(erro.stack)
      response.status(400).send({
        message: erro.message
      });
    }
  }

}