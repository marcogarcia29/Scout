import React, { useContext, useState, useEffect } from "react";
import TeamContext from "./TeamContext";
import './Home.css';

const Home = () => {
  const { players, setPlayers } = useContext(TeamContext);
  const { name, setName } = useContext(TeamContext);

  const [rent, setRent] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}  

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

    var cont = 0;

    changePlayers.forEach((player) => {
      if (player.payment === true) {
        cont += 1;
      }
    });
    setTotalPaid(cont);
  };
  // LOCAL STORAGE GUYS
  useEffect(() => {
    if (players.length === 0) {
      const storageItens = localStorage.getItem("players");
      if (storageItens) {
        setPlayers(JSON.parse(storageItens));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  // LOCAL STORAGE RENT
  useEffect(() => {
    if (rent === 0) {
      const storageRent = localStorage.getItem("rent");
      if (storageRent) {
        setRent(JSON.parse(storageRent));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rent", JSON.stringify(rent));
  }, [rent]);

  return (
    <>
      <h3>Insira o nome dos jogadores</h3>

      {/* Form 1*/}
      <form className="formalize">
        <h3>Valor do aluguel:</h3>
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        />
      </form>

      {/* Form 2*/}
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

      {/* Card */}
      <div className="organized-container">
        <h2>JOGADORES</h2>
        <div>
          Próximo
        </div>
        <div>
          <h3>Valor a pagar: </h3>
          {formatPrice(rent)}
        </div>
        {players?.map((player, index) => (
          <div 
            className="card-player"
            key={player.id}
          >
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
