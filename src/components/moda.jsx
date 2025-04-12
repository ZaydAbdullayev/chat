import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { chats } from "../services/data";

export const FormModal = ({ setModal, modal }) => {
  const [nickname, setNickname] = useState("");
  const [experience, setExperience] = useState("1 month");
  const navigate = useNavigate();
  const closeModal = () => {
    setModal(false);
  };

  const generateRandomUserId = () => {
    const randomId = Math.floor(Math.random() * 1000000); // 1 ile 999999 arasında rastgele bir sayı üret
    return `user_${randomId}`; // Kullanıcı ID'sini oluştur
  };

  const handleJoinChat = () => {
    const userId = generateRandomUserId(); // Rastgele kullanıcı ID'sini oluştur
    const userData = {
      nickname,
      experience,
      userId, // Kullanıcı ID'sini ekle
    };
    localStorage.setItem("user", JSON.stringify(userData)); // Kullanıcı bilgilerini localStorage'a kaydet
    localStorage.setItem("channel", chats[experience].key); // Kanal adını localStorage'a kaydet
    closeModal(); // Modalı kapat
    navigate(`/chat/${experience}`);
  };

  return (
    <div className={`modal ${modal ? "active" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Form of Trench</h2>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label>
            <span>Nickname</span>
            <input
              type="text"
              placeholder="Enter your nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <div className="experience-options">
            <span>Experience</span>

            <input
              type="radio"
              id="exp1"
              name="experience"
              value="0"
              defaultChecked
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="exp1">1 month</label>

            <input
              type="radio"
              id="exp2"
              name="experience"
              value="1"
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="exp2">2–4 months</label>

            <input
              type="radio"
              id="exp3"
              name="experience"
              value="2"
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="exp3">6+ months</label>

            <input
              type="radio"
              id="exp4"
              name="experience"
              value="3"
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="exp4">1 year+</label>
          </div>
          <button onClick={handleJoinChat} className="w100">
            Join Chat
          </button>
          <span>
            After the process, we will direct you to the appropriate group.
          </span>
        </div>
      </div>
    </div>
  );
};
