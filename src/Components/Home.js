import React, { useContext, useState, useEffect } from "react";
import TeamContext from "./TeamContext";
import { Link } from 'react-router-dom'
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
    if(name !== ""){  
      setPlayers([
        ...players,
        { name: name, id: players.length + 1, payment: false },
      ]);
      setName("");
    }
  };

  const handleChange = (index) => {
    const changePlayers = [...players];
    changePlayers[index].payment = !changePlayers[index].payment;
    setPlayers(changePlayers);

    const shouldBePaid = rent/players.length

    if (changePlayers[index].payment === true) {
      setTotalPaid(totalPaid - shouldBePaid)
    }else{
      setTotalPaid(totalPaid + shouldBePaid)
    }
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

  useEffect(() => {
    rent >= 0 ? setTotalPaid(rent) : setTotalPaid(0)
  }, [rent]);

  // LOCAL STORAGE TOTAL PAID
  useEffect(() => {
    if (rent === 0) {
      const storagePaid = localStorage.getItem("totalPaid");
      if (storagePaid) {
        setRent(JSON.parse(storagePaid));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("totalPaid", JSON.stringify(totalPaid));
  }, [totalPaid]);

  return (
    <>
      <h3>Insira o nome dos jogadores</h3>

      {/* Form 1*/}
      <form className="formalize" onSubmit={addPlayer}>
        <label className="labelForm">Valor do aluguel:</label>
        <input
          type="number"
          min="0"
          step=".01"
          value={Math.abs(rent)}
          onChange={(e) => rent >= 0 ? setRent(e.target.value): setRent(0)}
          className="inputForm"
        />

        <label>Nome do jogador </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputForm"
        />
        <button className="sendPlayerNameBtn" onClick={(e) => addPlayer(e)} type="submit">
          Enviar
        </button>
      </form>

      {/* Card */}
      <div className="organized-container">
        <h2>JOGADORES</h2>
        <div style={{ marginBottom: "10px" }}>
          <h3>Valor a ser pago: </h3>
          {formatPrice(totalPaid)}
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
        ))}{totalPaid === 0  && (
          <>
            <Link to="/teams">
              <button className="createTeamBtn">CRIAR TIMES</button>
            </Link>
          </>
        )}
        
      </div>
    </>
  );
};

export default Home;
