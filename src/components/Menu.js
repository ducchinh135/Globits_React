import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaClipboardList } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to="/">
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/countries">
            <FaClipboardList />
            <span>Countries</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
