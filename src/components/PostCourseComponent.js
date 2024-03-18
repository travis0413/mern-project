import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [price, setPrice] = useState("");
  let [message, setMessage] = useState("");

  const inputHandler1 = (e) => {
    setTitle(e.target.value);
  };

  const inputHandler2 = (e) => {
    setContent(e.target.value);
  };

  const inputHandler3 = (e) => {
    setPrice(e.target.value);
  };

  const submitHandler = () => {
    if (!(title === "" || content === "" || price === "")) {
      axios.post("http://localhost:3000/course/", {
        instuctorId: currentUser[0].id,
        Title: title,
        Content: content,
        Price: price,
        Number: 0,
      });
      alert("新課程已創建成功");
      navigate("/course");
    } else {
      setMessage("三個欄位都必須填寫");
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ textAlign: "center" }}>
          <h1>在發布新課程之前，您必須先登錄。</h1>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              navigate("/Login");
            }}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser[0].Role === "student" && (
        <div style={{ textAlign: "center" }}>
          <h1>只有講師可以發布新課程。</h1>
        </div>
      )}
      {currentUser && currentUser[0].Role === "instructor" && (
        <div className="form-group">
          <label for="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={inputHandler1}
          />
          <br />
          <label for="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={inputHandler2}
          />
          <br />
          <label for="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={inputHandler3}
          />
          <br />
          {message && (
            <div
              className="alert alert-warning"
              style={{ textAlign: "center" }}
            >
              <h5>{message}</h5>
            </div>
          )}
          <br />
          <button className="btn btn-primary" onClick={submitHandler}>
            交出表單
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
