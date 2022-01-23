const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

let connectedPerrs = [];

io.on('connection', (socket) => {
    connectedPerrs.push(socket.id);
    console.log(connectedPerrs);

    socket.on('disconnect', () => {
        console.log('user disconnected');

        const newConnectedPerrs = connectedPerrs.filter((peerSocketId) => {
            return peerSocketId !== socket.io;
        });

        connectedPerrs = newConnectedPerrs
    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})