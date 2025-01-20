import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">LamaBooking</span>
        <div className="navItem">
          <button className="navButton">Register</button>
          <button className="navButton">login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
