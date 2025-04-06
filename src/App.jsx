import { useState, useEffect } from "react";
import "./App.css";
import socket from "./services/fetch.service";

function App() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const sendMessage = () => {
    socket.emit("send_message", msg);
    setMsg("");
    console.log("send_message", msg);
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMsgs((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <>
      <div>
        <h1>Chat with Socket.io on Vercel</h1>
        <input
          type="text"
          id="input-message"
          placeholder="Type a message..."
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              socket.emit("send_message", msg);
              setMsg("");
              console.log("send_message", msg);
            }
          }}
          value={msg}
        />{" "}
        <button onClick={sendMessage}>send</button>
        <ul id="messages">
          {msgs.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
