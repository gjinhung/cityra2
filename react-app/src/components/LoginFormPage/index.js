import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async (e) => {
    let demail = "demo@aa.io"
    let dpassword = "password"
    const data = await dispatch(login(demail, dpassword));
    if (data) {
      setErrors(data);
    }
  }

  return (
    // <div className="loginpage">
    <form onSubmit={handleSubmit}
      className="login-form">
      <div className="form-group">
        <h3 className="step-title">Log In</h3>
        <label>
          <div style={{ color: "red" }}>{errors["email"]}</div>
        </label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <label className="form-group">
        <label>
          <div style={{ color: "red" }}>{errors["password"]}</div>
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="loginsignup" type="submit">Log In</button>

      <h5
        className="demoUser"
        onClick={handleDemo}>
        Click Here for Demo User
      </h5>
    </form>
    // </div>
  );
}

export default LoginFormPage;
