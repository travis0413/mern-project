import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [course, setCourse] = useState("");

  useEffect(() => {
    if (currentUser[0].Role === "instructor") {
      axios
        .get(`http://localhost:3000/course?instuctorId=${currentUser[0].id}`)
        .then((d) => {
          setCourse(d.data);
        });
    } else if (currentUser[0].Role === "student") {
      axios
        .get(`http://localhost:3000/enroll?EnrollId=${currentUser[0].id}`)
        .then((d) => {
          setCourse(d.data);
        });
    }
  });

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ textAlign: "center" }}>
          <h1>您必須先登入才能看到課程。</h1>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              navigate("/Login");
            }}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser[0].Role === "instructor" && (
        <div style={{ textAlign: "center" }}>
          <h1>歡迎來到講師的課程頁面。</h1>
          <br />
          <p>以下是您發佈的課程</p>
          <br />
        </div>
      )}
      {currentUser && currentUser[0].Role === "student" && (
        <div style={{ textAlign: "center" }}>
          <h1>歡迎來到學生的課程頁面。</h1>
          <br />
          <p>以下是您註冊的課程</p>
          <br />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {course &&
          course.map((courses) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>課程名稱: {courses.Title}</strong>
                  </h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    課程內容: {courses.Content}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>學生人數: 0</p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {courses.Price}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseComponent;
