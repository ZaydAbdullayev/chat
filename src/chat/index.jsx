import { useState, useEffect, useRef } from "react";
import "./index.css";
import { chats } from "../services/data";
import { useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import pubnub, {
  fetchNewMessages,
  fetchOldMessages,
  fetchOnlineUsers,
  sendMessage,
} from "../services/fetch.service";

export const ChatBox = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [actiedUsers, setActiveUsers] = useState(0);
  const { chatId } = useParams();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const oldMessages = await fetchOldMessages(100); 
      setMessages((prev) => [...oldMessages, ...prev]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const onlineUsers = async () => {
    try {
      const onlineUsers = await fetchOnlineUsers(chats[chatId].key);
      setActiveUsers(onlineUsers.channels[chats[chatId].key].occupancy);
    } catch (error) {
      console.error("Error fetching online users:", error);
    }
  };

  const send = () => {
    if (input.trim() === "") return;
    sendMessage(input); // Mesajı gönder
    setInput("");
  };

  useEffect(() => {
    const callback = (message) => {
      setMessages((prev) => {
        const msg = prev.find(
          (m) =>
            m.timetoken === message.timetoken &&
            m.entry.message === message.entry.message
        );
        if (!msg) {
          return [...prev, message]; // Yeni mesajı ekle
        } else {
          return prev; // Aynı mesaj varsa güncelleme yapma
        }
      });
    };
    fetchMessages();
    fetchNewMessages(callback);

    return () => {
      pubnub.unsubscribeAll();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    onlineUsers();
  }, [messages]);

  return (
    <>
      <div className="chat-container">
        <div className="chat-header">
          <p>📡 {chats[chatId].name}</p>
          <small className="fs-12">active user: {actiedUsers}</small>
        </div>
        <div className="chat-messages">
          {messages.map(({ entry, meta, timetoken }, index) => (
            <div
              key={`${timetoken}-${index}`}
              className={`message ${
                meta?.senderId === user?.userId ? "user" : "system"
              }`}
            >
              <span>{entry?.message}</span>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button onClick={send}>Transmit</button>
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
