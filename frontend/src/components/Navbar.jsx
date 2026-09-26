import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link to="/" className="logo">
        Ticket QR Generator
      </Link>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/create">Create Ticket</Link>
      </div>
    </nav>
  );
};

export default Navbar;