import "./home.css";
import "./index.css";
import { titles, chats } from "./services/data";
import { IoChatbubblesSharp } from "react-icons/io5";
import soon from "./assets/soon-3.png";
import soonbg from "./assets/soon-f.gif";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className="w100 df fdc aic wrapper">
      <div className="w100 df fdc aic content">
        <h1 className="title">Welcome to</h1>
        <h1 className="title">National Tranches Chat</h1>
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
              onClick={() =>
                chat.type === "public" && navigate(`/chat/${index}`)
              }
            >
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
    </div>
  );
}

export default App;
