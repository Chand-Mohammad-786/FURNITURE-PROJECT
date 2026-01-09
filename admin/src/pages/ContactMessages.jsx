import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [timeFilter, setTimeFilter] = useState("all");

  const loadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:9696/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Load messages error:", err);
    }
  };

  useEffect(() => {
    // initial load
    loadMessages();

    // real-time message
    socket.on("newContactMessage", (newMessage) => {
      setMessages((prev) => [newMessage, ...prev]);
    });

    return () => {
      socket.off("newContactMessage");
    };
  }, []);

  // ✅ DATE FILTER LOGIC
  const filteredMessages = messages.filter((m) => {
    if (timeFilter === "all") return true;

    const msgDate = new Date(m.createdAt);
    const now = new Date();

    if (timeFilter === "today") {
      return msgDate.toDateString() === now.toDateString();
    }

    if (timeFilter === "30days") {
      const last30 = new Date();
      last30.setDate(now.getDate() - 30);
      return msgDate >= last30;
    }

    if (timeFilter === "3years") {
      const last3Years = new Date();
      last3Years.setFullYear(now.getFullYear() - 3);
      return msgDate >= last3Years;
    }

    return true;
  });

  return (
    <div>
      <h3>Contact Messages</h3>

      {/* ✅ SINGLE SIMPLE FILTER (DROPDOWN) */}
      <div style={{ marginBottom: "16px" }}>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          style={{ padding: "6px 10px" }}
        >
          <option value="all">All</option>
          <option value="today">Current Day</option>
          <option value="30days">Last 30 Days</option>
          <option value="3years">Last 3 Years</option>
        </select>
      </div>

      {filteredMessages.length === 0 && (
        <p style={{ color: "#777" }}>No messages found</p>
      )}

      {filteredMessages.map((m) => (
        <div
          key={m._id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
          }}
        >
          <b>
            {m.firstName} {m.lastName}
          </b>{" "}
          ({m.email})
          {m.phone && (
            <p>
              <b>Phone:</b> {m.phone}
            </p>
          )}
          <p style={{ fontSize: "13px", color: "#666" }}>
            Date: {new Date(m.createdAt).toLocaleString()}
          </p>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactMessages;
