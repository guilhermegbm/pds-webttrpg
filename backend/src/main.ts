import express from "express"

import Login from "./context/user-account/application/Login"
import UserRepository from "./context/user-account/infra/repository/UserRepository"
import AuthenticationTokenGeneratorService from "./context/user-account/infra/service/AuthenticationTokenGeneratorService"
import AuthenticationTokenRepository from "./context/user-account/infra/repository/AuthenticationTokenRepository"

const server = express()
const port = 3000

server.get('/', async (req: any, res: any) => {

  const login = new Login(
    new UserRepository(),
    (password: any) => password,
    new AuthenticationTokenGeneratorService(),
    new AuthenticationTokenRepository()
  );

  const token = await login.execute("user1", "user1");
  res.json({
    message: "backend webttrpg running",
    token
  })
})

server.listen(port, () => {
  console.log(`backend webttrpg listening on port ${port}`)
})
