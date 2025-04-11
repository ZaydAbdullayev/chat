import "./home.css";
import "./index.css";
import { titles } from "./services/data";

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
  return (
    <div className="w100 df fdc aic wrapper">
      <div className="w100 df fdc aic content">
        <h1>Welcome to</h1>
        <h1>National Tranches Chat</h1>
      </div>
      <div className="w100 df fdc aic gap-5 content">
        <h2>Weekly Leaderboards / Hall of Fame</h2>
        <div className="w100 df fdc aic gap-5 winners">
          {weeklyWinner.map((winner, index) => (
            <div key={index} className="w100 df fdc aic winner-card">
              <img src={titles[index]} alt="title" />
              <h3>{winner.name}</h3>
              <p>Score: {winner.score}</p>
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
