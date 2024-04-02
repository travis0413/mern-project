import React from "react";
import { Link } from "react-router-dom";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const logoutHandler = () => {
    localStorage.removeItem("User");
    setCurrentUser(null);
    alert("即將登出系統，前往首頁");
  };

  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-primary" to="/">
                    首頁
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/register"
                    >
                      註冊會員
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/Login"
                    >
                      會員登入
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/"
                      onClick={logoutHandler}
                    >
                      登出
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/profile"
                    >
                      個人頁面
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/course"
                    >
                      課程頁面
                    </Link>
                  </li>
                )}
                {currentUser && currentUser[0].Role === "instructor" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/postCourse"
                    >
                      新增課程
                    </Link>
                  </li>
                )}
                {currentUser && currentUser[0].Role === "student" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/enroll"
                    >
                      註冊課程
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
