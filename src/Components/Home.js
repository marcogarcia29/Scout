import React, { useContext } from "react";
import TeamContext from "./TeamContext";

const Home = () => {
  const { players, setPlayers } = useContext(TeamContext);
  const { name, setName } = useContext(TeamContext);

  const addPlayer = (e) => {
    e.preventDefault();
    setPlayers([
      ...players,
      { name: name, id: players.length + 1, payment: false },
    ]);
    setName("");
  };

  const handleChange = (index) => {
    const changePlayers = [...players];
    changePlayers[index].payment = !changePlayers[index].payment;
    setPlayers(changePlayers);
  };

  return (
    <>
      <form className="formalize" onSubmit={addPlayer}>
        <label>Nome do jogador </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={(e) => addPlayer(e)} type="button">
          Enviar
        </button>
      </form>
      <div className="organized">
        {players?.map((player, index) => (
          <div key={player.id}>
            <p>{player.name}</p>
            <input
              type="checkbox"
              checked={player.payment}
              onChange={() => handleChange(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
