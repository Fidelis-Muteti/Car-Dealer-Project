import React from "react";
import { Link } from "react-router-dom"
function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
