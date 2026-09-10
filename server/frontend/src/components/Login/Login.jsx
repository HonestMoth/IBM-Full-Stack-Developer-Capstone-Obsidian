import React, { useState } from 'react';
import "./Login.css";
import Header from '../Header/Header';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(login_url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userName, password }) });
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      setOpen(false);
    } else alert("The user could not be authenticated.");
  };

  if (!open) window.location.href = "/";

  return (
    <div className="page-shell">
      <Header />
      <main className="auth-page">
        <section className="auth-card">
          <div className="eyebrow">Member access</div>
          <h1 className="auth-title">Welcome back.</h1>
          <p className="auth-subtitle">Sign in to manage your dealership reviews and continue exploring our network.</p>
          <form className="auth-form" onSubmit={login}>
            <div className="auth-field"><label htmlFor="username">Username</label><input id="username" type="text" name="username" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
            <div className="auth-field"><label htmlFor="password">Password</label><input id="password" name="psw" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="auth-actions">
              <input className="action_button" type="submit" value="Login" />
              <input className="action_button secondary" type="button" value="Cancel" onClick={() => setOpen(false)} />
            </div>
          </form>
          <p className="auth-register">New here? <a className="loginlink" href="/register">Register now</a></p>
        </section>
      </main>
    </div>
  );
};
export default Login;
