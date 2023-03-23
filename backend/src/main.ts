import express from "express"
const server = express()
const port = 3000

server.get('/', (req: any, res: any) => {
  res.json({
    message: "backend webttrpg running"
  })
})

server.listen(port, () => {
  console.log(`backend webttrpg listening on port ${port}`)
})