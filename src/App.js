import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Teams from './Components/Teams'
import Navbar from './Components/Navbar'
import TeamContext from './Components/TeamContext'
import Home from './Components/Home'
import { Scout } from './Components/Scout'

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const handleStorage = (e) => {
    e.preventDefault();
    setTeam1([]);
    setTeam2([]);
    setName("");
    setPlayers([]);
    localStorage.clear();
  }

  return (
    <Router>
      <TeamContext.Provider
        value={{
          players,
          setPlayers,
          name,
          setName,
          team1,
          setTeam1,
          team2,
          setTeam2,
        }}
      >
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/scout" element={<Scout />} />
            </Routes>
            <button className='clearStorageBtn' onClick={(e) => handleStorage(e)}> LIMPAR SELEÇÃO ATUAL</button>
          </div>
        </div>
      </TeamContext.Provider>
    </Router>
  );
}

export default App;
