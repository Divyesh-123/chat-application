const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', data => {
        io.emit('chat message', {
            user: socket.username,
            message: data
        });
    });

    socket.on('set username', username => {
        socket.username = username;
    });
});

server.listen(3000, () => {
    console.log('Server listening on *:3000');
});
