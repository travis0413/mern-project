import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [registerUserName, setRegisterUserName] = useState("");
  let [registerEmail, setRegisterEmail] = useState("");
  let [registerPassword, setRegisterPassword] = useState("");
  let [registerRole, setRegisterRole] = useState("");
  let [message, setMessage] = useState("");

  const inputHandler1 = (e) => {
    setRegisterUserName(e.target.value);
  };
  const inputHandler2 = (e) => {
    setRegisterEmail(e.target.value);
  };
  const inputHandler3 = (e) => {
    setRegisterPassword(e.target.value);
  };
  const inputHandler4 = (e) => {
    setRegisterRole(e.target.value);
  };

  const registerHandler = async () => {
    //使用JSON server簡易製作後端
    let databaseEmail = await axios.get(
      `http://localhost:3000/person?Email=${registerEmail}`
    );

    if (registerEmail !== "" && databaseEmail.data.length >= 1) {
      setMessage("信箱已被註冊，請重新輸入");
    } else if (
      !(
        registerUserName === "" ||
        registerEmail === "" ||
        registerPassword === "" ||
        registerRole === ""
      )
    ) {
      await axios.post("http://localhost:3000/person/", {
        Username: registerUserName,
        Email: registerEmail,
        Password: registerPassword,
        Role: registerRole,
      });
      alert("註冊完成，前往首頁");
      navigate("/");
      window.location.reload();
    }
  };

  //因表單送出阻止navigate發揮導向功能
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">用戶名稱:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              required
              onChange={inputHandler1}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">電子信箱：</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              required
              onChange={inputHandler2}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">密碼：</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              minLength="7"
              placeholder="長度至少超過6個英文或數字"
              required
              onChange={inputHandler3}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="role">身份：</label>
            <select
              required
              name="role"
              id="role"
              className="form-control"
              onChange={inputHandler4}
            >
              <option value="">---</option>
              <option value="instructor">教師</option>
              <option value="student">學生</option>
            </select>
          </div>
          <br />
          {message && <div className="alert alert-danger">{message}</div>}
          <br />
          <button className="btn btn-primary" onClick={registerHandler}>
            <span>註冊會員</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
