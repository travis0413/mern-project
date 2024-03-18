import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const logoutHandler = () => {
    localStorage.removeItem("User");
    setCurrentUser(null);
    alert("即將登出系統，前往首頁");
  };

  const active1Ref = useRef(null);
  const active2Ref = useRef(null);
  const active3Ref = useRef(null);
  const active4Ref = useRef(null);
  const active5Ref = useRef(null);
  const active6Ref = useRef(null);
  const active7Ref = useRef(null);
  const active8Ref = useRef(null);

  const activefunction = (e) => {
    for (let i = 0; i < active8Ref.current.children.length; i++) {
      active8Ref.current.children[i].children[0].classList.remove("active");
    }
    e.target.classList.add("active");
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      active1Ref.current.classList.add("active");
    } else if (window.location.pathname === "/register") {
      active2Ref.current.classList.add("active");
    } else if (window.location.pathname === "/Login") {
      active3Ref.current.classList.add("active");
    } else if (window.location.pathname === "/profile") {
      active4Ref.current.classList.add("active");
    } else if (window.location.pathname === "/course") {
      active5Ref.current.classList.add("active");
    } else if (window.location.pathname === "/postCourse") {
      active6Ref.current.classList.add("active");
    } else if (window.location.pathname === "/enroll") {
      active7Ref.current.classList.add("active");
    }
  }, []);

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
              <ul className="navbar-nav" ref={active8Ref}>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-outline-primary"
                    to="/"
                    ref={active1Ref}
                    onClick={(e) => {
                      activefunction(e);
                    }}
                  >
                    首頁
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/register"
                      ref={active2Ref}
                      onClick={(e) => {
                        activefunction(e);
                      }}
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
                      ref={active3Ref}
                      onClick={(e) => {
                        activefunction(e);
                      }}
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
                      ref={active4Ref}
                      onClick={(e) => {
                        activefunction(e);
                      }}
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
                      ref={active5Ref}
                      onClick={(e) => {
                        activefunction(e);
                      }}
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
                      ref={active6Ref}
                      onClick={(e) => {
                        activefunction(e);
                      }}
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
                      ref={active7Ref}
                      onClick={(e) => {
                        activefunction(e);
                      }}
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
