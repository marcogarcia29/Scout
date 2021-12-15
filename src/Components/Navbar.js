import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="https://img.icons8.com/office/40/000000/football.png" alt="site logo" />
<<<<<<< HEAD
      <h2 className="navTitle">Scout Social Wars</h2>
=======
>>>>>>> b0c0f85ab97325ae098e76df6ca2184de6dd7fe9
      <ul className="menu">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/teams">
          <li>Criar times</li>
        </Link>
        <Link to="/">
          <li>Login</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
