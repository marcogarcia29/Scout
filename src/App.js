import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Teams from './Components/Teams';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          <div className="content">
            <Routes>
              <Route path="/teams"
                element={<Teams/>}
              />
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
