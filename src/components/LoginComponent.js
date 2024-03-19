import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const emailInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    axios
      .get(`http://localhost:3000/person?Email=${email}&Password=${password}`)
      .then((d) => {
        if (d.data.length === 1) {
          localStorage.setItem("User", JSON.stringify(d.data));
          setCurrentUser(localStorage.getItem("User"));
          alert("登入成功。您現在將被重新導向到個人資料頁面。");
          window.location.href = "http://localhost:3001/profile";
        } else {
          setMessage("您的信箱或密碼錯誤，請重新輸入");
        }
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={emailInput}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={passwordInput}
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={loginHandler}>
          <span>登入</span>
        </button>
        {message && (
          <div className="alert alert-danger" style={{ marginTop: "2rem" }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
