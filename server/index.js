const express = require("express");
const app = express();

const cors = require("cors");
const {Server} = require('socket.io');
const http = require("http");

const PORT = 5000;


app.use(cors())
const http_server = http.createServer(app);


const io = new Server(http_server,{
    cors:{
        origin:"http://localhost:3000",
        methods : ["GET","POST"]
    }
});
io.on("connection",(socket) => {
    // console.log(socket.id);
    socket.on("join_room", (data) => {
        socket.join(data.room)
      console.log(data)
        socket.emit("send_room_info",data)
    });
    socket.on("send_message", (data) => {
       
       socket.to(data.joiendRoom).emit("recive_message",data)
           
    });
    

})


http_server.listen(PORT,() => {
    console.log(`express server runing on port ${PORT}`)
})