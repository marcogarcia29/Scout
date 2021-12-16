import React, { useContext, useEffect, useState } from "react";
import TeamContext from "./TeamContext";

import "./Home.css";

const Home = () => {
  const { players, setPlayers } = useContext(TeamContext);
  const { name, setName } = useContext(TeamContext);

  const [rent, setRent] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

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

    let count = 0;

    changePlayers.forEach((player) => {
      if (player.payment === true) {
        count += 1;
      }
    });

    console.log(count);

    const newTotalPaid = rent / count;
    setTotalPaid(newTotalPaid);
  };

  useEffect(() => {
    setTotalPaid(rent);
  }, [rent]);

  return (
    <>
      <h3>Insira o nome dos jogadores</h3>

      {/* Form 1*/}
      <form className="formalize" onSubmit={addPlayer}>
        <label className="labelForm">Valor do aluguel:</label>
        <input
          type="number"
          step=".01"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="inputForm"
        />

        <label>Nome do jogador </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputForm"
        />

        <button onClick={(e) => addPlayer(e)} type="button">
          Enviar
        </button>
      </form>

      {/* Card */}
      <div className="organized-container">
        <h2>JOGADORES</h2>
        <div>Próximo</div>
        <div style={{ marginBottom: "10px" }}>
          <h3>Valor a pagar por jogador: </h3>
          {`R$ ${Number(totalPaid).toFixed(2)}`}
        </div>
        {players?.map((player, index) => (
          <div className="card-player" key={player.id}>
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
