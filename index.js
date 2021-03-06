// code away!
const express = require("express")
const cors = require("cors")
// const morgan = require("morgan")
const logger = require("./middleware/logger")

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express()
const port = 8080;

server.use(express.json())
server.use(cors())
// server.use(morgan())
server.use(logger({format: "long"}))

server.use("/posts", postRouter)
server.use("/users", userRouter)

server.use((req, res) => {
    res.status(404).json({
        message: "Route was not found.",
    })
})

server.use((error, req, res, next) => {
    console.log(console.error())
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})