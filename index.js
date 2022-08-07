let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

    // socket.emit('userJoin','welcome user')
    socket.on('join', (data) => {
        console.log(data);
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('userJoin',`${data.user} has joined the room`);
    });

    socket.on('message', (data) => {
        console.log(data);
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
