import React, { useContext, useEffect } from 'react'
import TeamContext from './TeamContext'

const Teams = () => {
  const { players } = useContext(TeamContext)
  const { team1, setTeam1 } = useContext(TeamContext)
  const { team2, setTeam2 } = useContext(TeamContext)

  const handlePlayers = (e) => {
    if (players.length) {
      const playerName = players[Math.floor(Math.random() * players.length)]
      setTeam1([...team1, playerName])
      const getPlayer = players.indexOf(playerName)
      players.splice(getPlayer, 1)
      localStorage.removeItem('players');
    }
  };

  const handlePlayers2 = (e) => {
    if (players.length) {
      const playerName = players[Math.floor(Math.random() * players.length)]
      setTeam2([...team2, playerName])
      const getPlayer = players.indexOf(playerName)
      players.splice(getPlayer, 1)
      localStorage.removeItem('players');
    }
  };

  // LOCAL STORAGE TEAM1
  useEffect(() => {
    if (team1.length === 0) {
      const storageTeam1 = localStorage.getItem("team1");
      if (storageTeam1) {
        setTeam1(JSON.parse(storageTeam1));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("team1", JSON.stringify(team1));
  }, [team1]);

  // LOCAL STORAGE TEAM2
  useEffect(() => {
    if (team1.length === 0) {
      const storageTeam2 = localStorage.getItem("team2");
      if (storageTeam2) {
        setTeam2(JSON.parse(storageTeam2));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("team2", JSON.stringify(team2));
  }, [team2]);

  return (
    <div className="teamSelector">
      <div className="organized">
        <h2>JOGADORES</h2>
        {players?.map(player => (
          <div key={player.id}>
            <p>{player.name}</p>
          </div>
        ))}
        <button className="btnTeam" onClick={e => handlePlayers(e)}>
          SELECIONAR JOGADOR TIME A
        </button>
        <button className="btnTeam" onClick={e => handlePlayers2(e)}>
          SELECIONAR JOGADOR TIME B
        </button>
      </div>
      <div className="teams">
        <div className="alignTeams">
          <h3>TIME A</h3>
          {team1?.map(selected => (
            <div key={selected.id}>
              <p>{selected.name}</p>
            </div>
          ))}
        </div>
        <div className="alignTeams">
          <h3>TIME B</h3>
          {team2?.map(selected => (
            <div key={selected.id}>
              <p>{selected.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Teams;
