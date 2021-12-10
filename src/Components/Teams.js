import React, { useState} from "react";

const Teams = () => {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState("");
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);

    const addPlayer = () => {
        setPlayers([...players, name]);
        setName("");
    };

    const handlePlayers = () => {
        const playerName = players[Math.floor(Math.random()*players.length)];
        setTeam1([...team1, playerName]);
        const getPlayer = players.indexOf(playerName);
        players.splice(getPlayer, 1);
    };

    const handlePlayers2 = () => {
        const playerName = players[Math.floor(Math.random()*players.length)];
        setTeam2([...team2, playerName]);
        const getPlayer = players.indexOf(playerName);
        players.splice(getPlayer, 1);
    };

    return (
        <div className="teamSelector">
            <form className="testForm">
                <label>Nome do jogador </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <button onClick={() => {addPlayer()}} type="button">
                    Enviar
                </button>
            </form>
            <div className="organized">
                {players?.map(player =>
                    <div key={player.id}><p>{player}</p></div>
                )}
                <button onClick={() => handlePlayers()}>SELECIONAR JOGADOR TIME 1</button>
                <button onClick={() => handlePlayers2()}>SELECIONAR JOGADOR TIME 2</button>
                {/* {console.log(players[Math.floor(Math.random()*players.length)])} */}
            </div>
            <div className="teams">
                <div className="alignTeams">
                <h3>TIME A</h3>
                    {team1?.map(selected => 
                        <p>{selected}</p>
                    )}
                </div>
                <div className="alignTeams">
                    <h3>TIME B</h3>
                    {team2?.map(selected => 
                        <p>{selected}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teams;