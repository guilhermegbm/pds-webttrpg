import express from "express"
import Login from "./context/user-account/application/Login"
import UserRepository from "./context/user-account/infra/repository/UserRepository"
import AuthenticationTokenGeneratorService from "./context/user-account/infra/service/AuthenticationTokenGeneratorService"
import AuthenticationTokenRepository from "./context/user-account/infra/repository/AuthenticationTokenRepository"

const server = express()
server.use(express.json());

const port = 3000

server.get('/', async (req: any, res: any) => {
  res.json({
    message: "backend webttrpg running"
  })
})


server.post('/signin', async (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const login = new Login(
    new UserRepository(),
    (password: any) => password,
    new AuthenticationTokenGeneratorService(),
    new AuthenticationTokenRepository()
  );
  const authenticationToken = await login.execute(username, password);

  res.json({
    authenticationToken
  })
})

server.listen(port, () => {
  console.log(`backend webttrpg listening on port ${port}`)
})
