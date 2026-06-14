import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="nav-brand" onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}>
          <span className="brand-logo">🛠️</span>
          <span className="brand-name">HireHelper</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(isLoggedIn ? "/dashboard" : "/"); }}>Home</a>
          <a href="#feed" onClick={(e) => { if(!isLoggedIn) { e.preventDefault(); navigate("/"); } }}>Find Helpers</a>
          <a href="#settings" onClick={(e) => { if(!isLoggedIn) { e.preventDefault(); navigate("/"); } }}>Become Helper</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); alert("HireHelper: Connecting trusted task creators with skilled local helpers."); }}>About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact support at support@hirehelper.com"); }}>Contact</a>

          {isLoggedIn ? (
            <div className="nav-auth-section">
              <button className="nav-btn-profile" onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
              <button className="nav-btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-section">
              <button className="nav-btn-login" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="nav-btn-register" onClick={() => navigate("/register")}>
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <div className="nav-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="nav-links-mobile">
          <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate(isLoggedIn ? "/dashboard" : "/"); }}>Home</a>
          <a href="#feed" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if(isLoggedIn) navigate("/dashboard"); else navigate("/"); }}>Find Helpers</a>
          <a href="#settings" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if(isLoggedIn) navigate("/dashboard"); else navigate("/"); }}>Become Helper</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); alert("HireHelper description"); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); alert("support@hirehelper.com"); }}>Contact</a>
          
          {isLoggedIn ? (
            <div className="mobile-auth-btns">
              <button onClick={() => { setMobileMenuOpen(false); navigate("/dashboard"); }}>Dashboard</button>
              <button className="logout-btn" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>Logout</button>
            </div>
          ) : (
            <div className="mobile-auth-btns">
              <button onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}>Login</button>
              <button className="register-btn" onClick={() => { setMobileMenuOpen(false); navigate("/register"); }}>Sign Up</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
