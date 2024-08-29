import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

const AdminNav = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = localStorage.getItem("user") || "{}";
    const user = JSON.parse(getUser);
    if (user.data) {
      setUsername(user.data.username);
    }
  }, []);
  return (
    <nav className="w-full h-12 border-2 flex items-center justify-between p-5">
      <h1>Olyzano Dashboard</h1>
      <div className="left-nav-wrapper flex items-center gap-2">
        <FaBell />
        <div className="dropdown-wrapper">
          <h3>{username}</h3>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
