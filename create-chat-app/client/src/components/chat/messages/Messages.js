import React from "react";
import Message from "../message/Message";
import "./Messages.css";
import STB from "react-scroll-to-bottom";

function Messages({ messages, user_id }) {
  return (
    <STB className="messages">
      {/* Messages {user_id} */}
      {messages.map((message, i) => (
        <Message key={message._id} message={message} current_uid={user_id} />
      ))}
    </STB>
  );
}

export default Messages;
