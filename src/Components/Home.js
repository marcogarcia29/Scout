import React, {useContext, useEffect, useState} from "react";
import TeamContext from "./TeamContext";

const Home = () => {
    const {players, setPlayers} = useContext(TeamContext);
    const {name, setName} = useContext(TeamContext);
    const addPlayer = (e) => {
        e.preventDefault();
        setPlayers([...players, name]);
        setName("");
    };
    
    return (
        <>
            <form className="testForm" onSubmit={addPlayer}>
                <label>Nome do jogador </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <button onClick={(e) => addPlayer(e)} type="button">
                    Enviar
                </button>
            </form>
            <div className="organized">
                {players?.map(player =>
                    <div key={player.id}>
                        <p>{player}</p>
                    </div>
                )}
            </div>
        </>


    )
};

export default Home;