import HttpRestController from "../../../../infra/http/HttpRestController";
import Request from "../../../../infra/http/Request";
import Response from "../../../../infra/http/Response";
import GetUserById from "../../application/GetUserById";
import SQLUserRepository from "../repository/SQLUserRepository";

export default class HttpRestGetUserById implements HttpRestController {

  private getUserById: GetUserById;

  constructor() {
    this.getUserById = new GetUserById(new SQLUserRepository())
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.getParams().user_id;
      const user = await this.getUserById.execute(userId);
      response.status(200).send( user );
    } catch (erro: any) {
      console.error(erro.stack)
      response.status(400).send({
        message: erro.message
      });
    }
  }

}