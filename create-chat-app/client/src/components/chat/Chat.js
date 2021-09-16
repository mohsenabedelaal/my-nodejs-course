import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import io from "socket.io-client";
import Messages from "./messages/Messages";
import Input from "./input/Input";
import "./Chat.css";
let socket;

function Chat() {
  const ENDPT = "http://localhost:5000";
  const { user, setUser } = useContext(UserContext);
  const { room_id, room_name } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // console.log(user);
    socket = io(ENDPT);
    socket.emit("join", { name: user.name, room_id, user_id: user.id });
    socket.emit("room-chat-messages", room_id, (messages) =>
      setMessages(messages)
    );
  }, []);

  useEffect(() => {
    socket.on("message", (message) => setMessages([...messages, message]));
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, room_id, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        {/* <h1>Chat {JSON.stringify(user)}</h1> */}
        {/* <pre>{JSON.stringify(messages, null, "\t")}</pre> */}
        <Messages messages={messages} user_id={user.id} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
