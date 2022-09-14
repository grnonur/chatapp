import express from "express"
import dotenv from "dotenv"
import { Server } from 'socket.io';
import main from "./routes/main.js"
import users from "./routes/users.js"
import session from "express-session"
import mongoose from "mongoose"

dotenv.config();
const port = process.env.PORT;


const app = express();

mongoose.connect(`mongodb://127.0.0.1/chatapp`);

app.use(session({
    secret: 'chatappdevon', 
    resave: false,
    saveUninitialized: true
}));


//middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))//body parser

app.use('/', main);
app.use('/users', users);

const server = app.listen(port, (req, res) => {
    console.log(`Sunucu Aktif!`);
})

const io = new Server(server);

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
})