import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="tasks"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="create-task"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Create Task
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
