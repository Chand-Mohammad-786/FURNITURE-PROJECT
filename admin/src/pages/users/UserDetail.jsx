import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://furniture-project-spox.onrender.com/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => setUser(res.data.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!user) return null;

  return (
    <div className="section-card">
      <h2>User Profile</h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default UserDetail;
