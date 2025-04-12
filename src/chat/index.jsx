import { useState } from "react";
import "./index.css";
import { chats } from "../services/data";
import { useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export const ChatBox = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "🪖 Welcome to the Command Terminal", from: "system" },
  ]);
  const [input, setInput] = useState("");
  const { chatId } = useParams();

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: Date.now(), text: input, from: "user" }]);
    setInput("");
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-header">📡 {chats[chatId].name}</div>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.from}`}>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Transmit</button>
        </div>
      </div>
      <span
        className="df aic gap-10 back"
        onClick={() => window.history.back()}
      >
        <IoChevronBackOutline /> Go Back
      </span>
    </>
  );
};
