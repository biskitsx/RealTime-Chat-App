import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server, Socket } from 'socket.io'


interface messageDto {
    socket: Socket;
    username: string
    room: string
}
function main() {
    // express app
    const app = express()

    // middleware config
    app.use(cors())

    app.get("/", (req, res, next) => {
        res.json({ msg: "hello" })
    })

    const server = http.createServer(app)

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection", (socket: Socket) => {
        console.log(`User Connected" ${socket.id}`)

        // join room
        socket.on("joinRoom", (room: string) => {
            socket.join(room)
            console.log(`User with ID: ${socket.id} has joined room: ${room}`)
        })

        socket.on("sendMessage", (data: messageDto) => {
            console.log(data)
            socket.to(data.room).emit("receiveMessage", data)
        })

        socket.on("disconnect", () => {
            console.log(`User Disconnected" ${socket.id}`)
        })
    })

    server.listen(3000, () => {
        console.log(`server: http://localhost:3000`)
    })
}

main()