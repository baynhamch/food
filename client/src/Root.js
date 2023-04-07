import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
function Root() {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {/* <Dropdown /> */}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
