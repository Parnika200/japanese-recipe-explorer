import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      
      <div className="logo">
        🍜 Nihon Bites
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dishes">Dishes</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/search">Search</NavLink>
      </div>

    </nav>
  );
}

export default Navbar;