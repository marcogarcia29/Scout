import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
      </div>
    </Router>
  );
}

export default App;
