import React from 'react';
import "../assets/style.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    const logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, { method: "GET" });
    const json = await res.json();
    if (json) {
      const username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      if (username) alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  const curr_user = sessionStorage.getItem('username');

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="/" aria-label="Cars Dealership home">
          <span className="brand-mark">CD</span>
          <span className="brand-name">Cars Dealership</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a className="site-nav-link" href="/">Home</a>
          <a className="site-nav-link" href="/about">About Us</a>
          <a className="site-nav-link" href="/contact">Contact Us</a>
        </nav>

        <div className="header-account">
          {curr_user ? (
            <>
              <span className="header-user">{curr_user}</span>
              <a className="header-action" href="/djangoapp/logout" onClick={logout}>Logout</a>
            </>
          ) : (
            <a className="header-action header-login" href="/login">Login</a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
