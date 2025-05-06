import React from "react";
import SideBar from "../Layouts/AdminPageLayout/SideBar";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
