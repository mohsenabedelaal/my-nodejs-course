const { addUser, getUser, removeUser } = require("./helper");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
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
const Message = require("./models/Message");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});
app.get("/set-cookies", (req, res) => {
  // set secure so is will be hidden from the dev tools
  res.cookie("username", "Tony", { secure: true });
  // set httponly so we cannot access the cookies from the console log
  res.cookie("isAuthenticated", true, { httpOnly: true });
  // you can set a maxAge for the cookie h min sec msec
  res.cookie("token", "this-is-the-token", { maxAge: 24 * 60 * 60 * 1000 });
  res.send("cookies are set");
});
app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;

  res.json(cookies);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  Room.find().then((result) => {
    // console.log("output-rooms", result);
    socket.emit("output-rooms", result);
  });
  socket.on("create-room", (name) => {
    // console.log("The room name received is " + name);
    const room = new Room({ name });
    room.save().then((result) => io.emit("room-created", result));
  });

  socket.on("room-chat-messages", (room_id, callback) => {
    Message.find({ room_id: room_id }).then((result) => {
      callback(result);
    });
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
    // console.log("message", msgToStore);
    const msg = new Message(msgToStore);
    msg.save().then((result) => {
      io.to(room_id).emit("message", result);
      callback();
    });
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
