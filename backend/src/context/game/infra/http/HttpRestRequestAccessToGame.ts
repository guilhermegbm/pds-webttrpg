import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import RequestAccessToGame from "../../application/RequestAccessToGame";
import SQLGamePlayerRepository from "../repository/SQLGamePlayerRepository";
import SQLGameRepository from "../repository/SQLGameRepository";
import SQLPlayerRepository from "../repository/SQLPlayerRepository";


export default class HttpRestRequestAccessToGame implements HttpRestController {

  private requestAccessToGame: RequestAccessToGame;

  constructor() {
    this.requestAccessToGame = new RequestAccessToGame(
      new SQLGameRepository(),
      new SQLPlayerRepository(),
      new SQLGamePlayerRepository())
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const playerId = request.getBody().playerId;
      const gameId = request.getBody().gameId;
      const game = await this.requestAccessToGame.execute(playerId, gameId);
      response.status(200).end()
    } catch (erro: any) {
      console.error(erro.stack)
      response.status(400).send({
        message: erro.message
      });
    }
  }

}