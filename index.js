const express = require('express');
const app = express();
require('./config/db')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { userdata } = require('./sockets');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('a user connected');
  userdata(io, socket)
});

server.listen(5000, () => {
  console.log('The Port is Running at 5000');
});