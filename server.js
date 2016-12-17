import express from 'express';
import path from 'path';
import http from 'http';
import apiRouter from './api';
import SocketIO from 'socket.io';
import { validNick, findIndex, sanitizeString } from './src/modules/utils';


const app = express();
const server = http.Server(app)
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

let users = [];
let sockets = {};

io.on('connection', (socket) => {

	let currentUser = {
        id: socket.id,
        colorString: 'rgb(' + 
            Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ')',
        pointer: 0
    };

    if (findIndex(users, currentUser.id) > -1) {
        socket.disconnect();
    } else if (!validNick(currentUser.id)) {
        socket.disconnect();
    } else {
        sockets[currentUser.id] = socket;
        users.push(currentUser);
        io.emit('player join', { 
            id: currentUser.id, 
            colorString: currentUser.colorString, 
            pointer: currentUser.pointer,  
            users 
        });
        
    }

    socket.on('disconnect', () => {
        if (findIndex(users, currentUser.id) > -1) users.splice(findIndex(users, currentUser.id), 1);
        socket.broadcast.emit('player disconnect', {id: currentUser.id, users});
    });

    socket.on('move user', resp => {
        console.log('moved', resp)
        socket.broadcast.emit('move player', { user: resp.user, pointer: resp.pointer });
    })
});

app.use(express.static('./public'));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, '../public') });
})

server.listen(port, () => {
	console.log('Started on ' + port)
});