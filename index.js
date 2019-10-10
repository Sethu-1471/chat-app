var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

io.on("connection", socket => {
  io.emit("online", Object.keys(io.sockets.connected).length);

  console.log("connection");
  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  socket.on("created", data => {
    socket.broadcast.emit("created", data);
  });

  socket.on("chats", data => {
    socket.broadcast.emit("chats", data);
  });

  socket.on("joined", data => {
    socket.broadcast.emit("joined", data);
  });
  socket.on("leaved", data => {
    socket.broadcast.emit("leaved", data);
  });
});
