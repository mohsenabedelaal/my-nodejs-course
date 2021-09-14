const { addUser, getUser, removeUser } = require("./helper");

const app = require("express")();
const httpServer = require("http").createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const mongodb = process.env.mongodb;
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongo db"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
const Room = require("./models/Room.js");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("create-room", (name) => {
    // console.log("The room name received is " + name);
    const room = new Room({ name });
    room.save().then((result) => io.emit("room-created", result));
  });
  socket.on("join", ({ name, user_id, room_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      user_id,
      room_id,
    });
    socket.join(room_id);
    if (error) {
      console.log("join error", error);
    } else {
      console.log("join user", user_id);
    }
  });
  socket.on("sendMessage", (message, room_id, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    console.log("message", msgToStore);
    io.to(room_id).emit("message", msgToStore);
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
