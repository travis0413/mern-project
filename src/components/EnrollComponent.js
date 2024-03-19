import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [input, setInput] = useState("");
  let [course, setCourse] = useState("");
  let [message, setMessage] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = async () => {
    let courseURL = await axios.get(
      `http://localhost:3000/course?Title=${input}`
    );
    setCourse(courseURL.data);
  };

  const registerHandler = async (id, number, title, price, content) => {
    let enrollIsRepeated = await axios.get(
      `http://localhost:3000/enroll?EnrollId=${currentUser[0].id}&CourseId=${id}`
    );
    if (enrollIsRepeated.data.length === 0) {
      await axios.patch(`http://localhost:3000/course/${id}`, {
        Number: (number += 1),
      });
      await axios.post("http://localhost:3000/enroll", {
        CourseId: id,
        EnrollId: currentUser[0].id,
        Title: title,
        Content: content,
        Price: price,
        Number: number,
      });
      alert("您已完成註冊該課程，即將移動到課程頁面");
      navigate("/course");
      window.location.reload();
    } else {
      setMessage("您已註冊過該課程，請挑選其他課程");
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ textAlign: "center" }}>
          <h1>您必須先登入才能開始註冊課程。</h1>
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
        <div>
          <h1>只有學生才能夠註冊課程</h1>
        </div>
      )}
      {currentUser && currentUser[0].Role === "student" && (
        <div className="search input-group mb-3">
          <input type="text" className="form-control" onChange={inputHandler} />
          <button className="btn btn-primary" onClick={searchHandler}>
            搜尋課程
          </button>
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
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {courses.Number}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {courses.Price}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      registerHandler(
                        courses.id,
                        courses.Number,
                        courses.Title,
                        courses.Price,
                        courses.Content
                      );
                    }}
                  >
                    註冊
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {message && (
        <div className="alert alert-danger" style={{ textAlign: "center" }}>
          <h3>{message}</h3>
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
