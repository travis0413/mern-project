import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "./NavComponent";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </div>
  );
};

export default Layout;
