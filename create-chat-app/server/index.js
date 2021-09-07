const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("server side");
  console.log(socket.id);
  socket.on("create-room", (payload) => {
    console.log(payload);
  });
});

httpServer.listen(5000, () => {
  console.log("running on port 5000");
});
