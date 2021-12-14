import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Teams from './Components/Teams';
import Navbar from './Components/Navbar';
import TeamContext from './Components/TeamContext';
import Home from './Components/Home';

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  return (
    <Router>
      <TeamContext.Provider
        value={{players, setPlayers, name, setName, team1, setTeam1, team2, setTeam2}}
      >
        <div className="App">
          <Navbar/>
            <div className="content">
              <Routes>
                <Route exact path="/"
                  element={<Home/>}>
                </Route>
                <Route path="/teams"
                  element={<Teams/>}
                />
              </Routes>
            </div>
        </div>
      </TeamContext.Provider>
    </Router>
  );
}

export default App;
