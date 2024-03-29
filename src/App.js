import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import ProfileComponent from "./components/ProfileComponent";
import CourseComponent from "./components/CourseComponent";
import PostCourseComponent from "./components/PostCourseComponent";
import EnrollComponent from "./components/EnrollComponent";

function App() {
  let [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("User"))
  );

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route
            index
            element={
              <HomeComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="register"
            element={
              <RegisterComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="Login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="course"
            element={
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
