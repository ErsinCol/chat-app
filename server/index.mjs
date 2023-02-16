import http from 'http'
import express from 'express'
import logger from 'morgan' 
import cors from 'cors'

// mongo connection
import '../server/config/mongo.mjs'
// routes 
import indexRouter from './routes/index.mjs'
import userRouter from './routes/user.mjs'
import chatRoomRouter from "./routes/chatRoom.mjs"
import deleteRouter from "./routes/delete.mjs"

// middlewares 
import { decode } from './middlewares/jwt.mjs'

const app = express()

const port = 3000 // process.env.PORT

app.set('port', port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', indexRouter)
app.use("/users", userRouter)
app.use("/room", decode, chatRoomRouter)
app.use("/delete", deleteRouter)

/** catch 404 and forward to error handler */
app.use('*', (req, res)=>{
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
})


/** Create HTTP server. */
const server = http.createServer(app)
/** Listen on provided port, on all network interfaces. */
server.listen(port)
/** Event listener for HTTP server "listening" event. */
server.on('listening', ()=>{
    console.log(`Listening on port:: http://localhost:${port}/`)
})
