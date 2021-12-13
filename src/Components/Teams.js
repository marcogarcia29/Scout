import React, { useState, useContext } from "react";
import TeamContext from "./TeamContext";

const Teams = () => {
  const { players, setPlayers } = useContext(TeamContext);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const handlePlayers = () => {
    const playerName = players[Math.floor(Math.random() * players.length)];
    setTeam1([...team1, playerName]);
    const getPlayer = players.indexOf(playerName);
    players.splice(getPlayer, 1);
  };

  const handlePlayers2 = () => {
    const playerName = players[Math.floor(Math.random() * players.length)];
    setTeam2([...team2, playerName]);
    const getPlayer = players.indexOf(playerName);
    players.splice(getPlayer, 1);
  };

  return (
    <div className="teamSelector">
      <div className="organized">
        {players?.map((player) => (
          <div key={player.id}>
            <p>{player}</p>
          </div>
        ))}
        <button onClick={() => handlePlayers()}>
          SELECIONAR JOGADOR TIME 1
        </button>
        <button onClick={() => handlePlayers2()}>
          SELECIONAR JOGADOR TIME 2
        </button>
      </div>
      <div className="teams">
        <div className="alignTeams">
          <h3>TIME A</h3>
          {team1?.map((selected) => (
            <p>{selected}</p>
          ))}
        </div>
        <div className="alignTeams">
          <h3>TIME B</h3>
          {team2?.map((selected) => (
            <p>{selected}</p>
          ))}
        </div>
      </div>
      {console.log(players)}
    </div>
  );
};

export default Teams;
