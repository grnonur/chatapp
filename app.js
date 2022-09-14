import express from "express"
import dotenv from "dotenv"
import { Server } from 'socket.io';

dotenv.config();
const port = process.env.PORT;


const app = express();

app.get('/', (req, res) => {
    res.render('index')
})

//middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');

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