const express = require('express'); //syntax in CommonJS
const app = express(); // receive http requests, lsitening on a port
const http = require('http');
const server = require('http').createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);


app.get('/', (req, res) => {
    res.sendFile('chat.html', { root: __dirname })
})

server.listen(3000, ()=>{console.log("Listening on 3000")});

const httpServer = http.createServer(app);

//taking the webserver and enhancing it with socketio funcitonality
io.on("connection", socket => {
    console.log("Client connected");

    //send back a message to the newly connected client
    socket.emit("welcome", "Welcome from the chat server.");
    setInterval(()=> socket.emit('time', new Date().toTimeString()), 1000);

    //capture when client disconnect
    socket.on('disconect', () => console.log('Client disconnected'))

    socket.on('message', message => {
        console.log(message)
    })


})