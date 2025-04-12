import "./home.css";
import "./index.css";
import { titles, chats } from "./services/data";
import { IoChatbubblesSharp } from "react-icons/io5";
import soon from "./assets/soon-3.png";
import soonbg from "./assets/soon-f.gif";
import { useNavigate } from "react-router-dom";
import { FormModal } from "./components/moda";
import { useEffect, useState } from "react";
import { fetchOnlineUsers } from "./services/fetch.service";
import { RiUser3Fill } from "react-icons/ri";

const weeklyWinner = [
  {
    name: "John Doe",
    score: 100,
    title: "Soldier of the Week",
  },
  {
    name: "Jane Smith",
    score: 95,
    title: "Top Commander",
  },
  {
    name: "Alice Johnson",
    score: 90,
    title: "Trench MVP",
  },
];

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [modal, setModal] = useState(user?.userId ? false : true);
  const [activeUsers, setActiveUsers] = useState({});
  const navigate = useNavigate();

  const onlineUsers = async () => {
    try {
      const onlineUsers = await fetchOnlineUsers([
        "bunker_labs",
        "trench_warfare",
        "battlefield_heroes",
        "command_center",
      ]); // Online kullanıcıları al
      setActiveUsers(onlineUsers.channels); // Online kullanıcıları state'e ata
    } catch (error) {
      console.error("Error fetching online users:", error);
    }
  };

  useEffect(() => {
    onlineUsers(); // İlk odanın online kullanıcılarını al
  }, []);

  const goToChat = (index) => {
    localStorage.setItem("channel", chats[index].key); // Kanal adını localStorage'a kaydet
    navigate(`/chat/${index}`); // Public odalara git
  };

  return (
    <div className="w100 df fdc aic wrapper">
      <div className="w100 df fdc aic content">
        <h1 className="title">Welcome to</h1>
        <h1 className="title">National Tranches Chat</h1>
        <div className="df aic gap-15 btns">
          <button>X</button>
          {user?.userId ? (
            <>
              <button>YOUR ID: {user.userId}</button>
              <button onClick={()=> localStorage.removeItem("user")}>Change Profil</button>
            </>
          ) : (
            <button onClick={() => setModal(true)}>
              Join National Trenches
            </button>
          )}
        </div>
      </div>
      <div className="w100 df fdc aic gap-20 content">
        <h2 className="fs-32 title b-b">Weekly Leaderboards / Hall of Fame</h2>
        <div className="w100 df aic jcc winners">
          {weeklyWinner.map((winner, index) => (
            <div key={index} className={`df fdc aic winner-card _${index + 1}`}>
              <img src={titles[index]} alt="title" />
              <h3>{winner.name}</h3>
              <p>Score: {winner.score}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w100 df fdc aic gap-20 content">
        <h2 className="fs-32 title b-b">All Chats</h2>
        <div className="w100 df jcc fw chats">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`df fdc aic gap-15 chat-card _${index + 1}`}
              onClick={() => chat.type === "public" && goToChat(index)}
            >
              {chat.type === "public" && (
                <span className="df aic gap-5">
                  <RiUser3Fill /> {activeUsers[chat.key]?.occupancy || 0}
                </span>
              )}
              <IoChatbubblesSharp />
              <h3>{chat.name}</h3>
              <p>{chat.description}</p>
              {chat.type === "secret" && (
                <figure className="w100 df aic jcc soon">
                  <img src={soon} alt="soon" />
                  <img src={soonbg} alt="soon" className="chat-card-bg" />
                </figure>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w100 df fdc aic gap-5">
        <p>National Tranches Chat</p>
        <p>© 2023</p>
      </div>
      <FormModal modal={modal} setModal={setModal} />
    </div>
  );
}

export default App;
