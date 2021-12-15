import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="https://img.icons8.com/office/40/000000/football.png" alt="site logo" />
      <h2 className="navTitle">Scout Social Wars</h2>
      <ul className="menu">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/teams">
          <li>Criar times</li>
        </Link>
        <Link to="/scout">
          <li>Scout</li>
        </Link>
        <Link to="/">
          <li>Login</li>
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
