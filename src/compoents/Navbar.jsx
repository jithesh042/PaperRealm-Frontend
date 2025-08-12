import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <h2 className="logo" onClick={() => navigate("/")}>PaperRealm</h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/saved" className={({ isActive }) => isActive ? "active" : ""}>
            Saved
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/latest" className={({ isActive }) => isActive ? "active" : ""}>
            Latest
          </NavLink>
        </li>
        <li>
          <NavLink to="/top" className={({ isActive }) => isActive ? "active" : ""}>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to="/genres" className={({ isActive }) => isActive ? "active" : ""}>
            Genres
          </NavLink>
        </li>
        <li>
          <NavLink to="/manga-list" className={({ isActive }) => isActive ? "active" : ""}>
            Manga List
          </NavLink>
        </li>
        <li>
          <NavLink to="/novel-list" className={({ isActive }) => isActive ? "active" : ""}>
            Read Novel
          </NavLink>
        </li>
      </ul>

      <div className="auth-section">
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/profile")} className="profile-btn">Profile</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="login-btn">Login</button>
            <button onClick={() => navigate("/register")} className="register-btn">Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
