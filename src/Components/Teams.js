import React, { useContext } from "react";
import TeamContext from "./TeamContext";

const Teams = () => {
  const { players } = useContext(TeamContext);
  const {team1, setTeam1} = useContext(TeamContext);
  const {team2, setTeam2} = useContext(TeamContext);

  const handlePlayers = (e) => {
    e.preventDefault();
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
            <p>{player.name}</p>
          </div>
        ))}
        <button onClick={(e) => handlePlayers(e)}>
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
            <div key={selected.id}>
              <p>{selected.name}</p>
            </div>
          ))}
        </div>
        <div className="alignTeams">
          <h3>TIME B</h3>
          {team2?.map((selected) => (
            <div key={selected.id}>
              <p>{selected.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
