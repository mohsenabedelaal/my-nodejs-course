import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import io from "socket.io-client";
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
    <div>
      <div>
        {room_id} {room_name}
      </div>
      <h1>Chat {JSON.stringify(user)}</h1>
      <pre>{JSON.stringify(messages, null, "\t")}</pre>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default Chat;
