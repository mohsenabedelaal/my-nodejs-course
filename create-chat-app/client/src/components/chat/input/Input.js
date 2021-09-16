import React from "react";
import "./input.css";
function Input({ message, setMessage, sendMessage }) {
  return (
    <div>
      <form onSubmit={sendMessage} className="form">
        <input
          placeholder="Type a message"
          className="input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button className="sendButton">Send Message</button>
      </form>
    </div>
  );
}

export default Input;
