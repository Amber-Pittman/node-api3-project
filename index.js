// code away!
const express = require("express")
const cors = require("cors")

const postRouter = require("./posts/postRouter")

const server = express()
const port = 8080;

server.use(express.json())
server.use(cors())

server.use("/posts", postRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})