import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import socket from "../../socket";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        "https://furniture-project-spox.onrender.com/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers(res.data?.users || []);
    } catch (err) {
      console.error("Load users error:", err);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `https://furniture-project-spox.onrender.com/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  useEffect(() => {
    loadUsers();

    //SAFE SOCKET LISTENER
    if (socket) {
      socket.on("user_created", (newUser) => {
        setUsers((prev) => {
          if (prev.some((u) => u._id === newUser._id)) return prev;
          return [newUser, ...prev];
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("user_created");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Button base style
  const baseBtn = {
    padding: "6px 14px",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  return (
    <div className="section-card">
      <h2>User List</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || "-"}</td>
                <td>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link to={`/admin/users/${u._id}`}>
                      <button
                        style={{
                          ...baseBtn,
                          backgroundColor: "#eef2ff",
                          color: "#2563eb",
                        }}
                      >
                        View
                      </button>
                    </Link>

                    <Link to={`/admin/users/edit/${u._id}`}>
                      <button
                        style={{
                          ...baseBtn,
                          backgroundColor: "#ecfdf5",
                          color: "#16a34a",
                        }}
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(u._id)}
                      style={{
                        ...baseBtn,
                        backgroundColor: "#fef2f2",
                        color: "#dc2626",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
