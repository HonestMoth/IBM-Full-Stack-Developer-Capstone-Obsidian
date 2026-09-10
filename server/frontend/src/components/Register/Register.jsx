import React, { useState } from "react";
import "./Register.css";
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const gohome = () => { window.location.href = window.location.origin; };

  const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userName, password, firstName, lastName, email }) });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="page-shell">
      <Header />
      <main className="register-page">
        <section className="register_container">
          <div className="header">
            <span className="text">Create your account</span>
            <a href="/" onClick={gohome} aria-label="Close registration"><span aria-hidden="true">×</span></a>
          </div>
          <form onSubmit={register}>
            <div className="inputs">
              <input type="text" name="username" placeholder="Username" className="input_field" aria-label="Username" onChange={(e) => setUserName(e.target.value)} />
              <input type="text" name="first_name" placeholder="First Name" className="input_field" aria-label="First Name" onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" name="last_name" placeholder="Last Name" className="input_field" aria-label="Last Name" onChange={(e) => setlastName(e.target.value)} />
              <input type="email" name="email" placeholder="Email" className="input_field" aria-label="Email" onChange={(e) => setEmail(e.target.value)} />
              <input name="psw" type="password" placeholder="Password" className="input_field" aria-label="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="submit_panel"><input className="submit" type="submit" value="Register" /></div>
          </form>
        </section>
      </main>
    </div>
  );
};
export default Register;
