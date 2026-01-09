import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket";

const AdminDashBoard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:9696/admin/dashboard");
      if (res.data?.success) {
        setStats(res.data.stats || {});
      }
    } catch (err) {
      console.log("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    socket.on("orderPlaced", fetchStats);
    socket.on("orderRemoved", fetchStats);
    socket.on("orderStatusUpdated", fetchStats);

    return () => {
      socket.off("orderPlaced", fetchStats);
      socket.off("orderRemoved", fetchStats);
      socket.off("orderStatusUpdated", fetchStats);
    };
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  /* ===== STYLES ===== */
  const cardBase = {
    padding: "18px",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  };

  const countStyle = {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "4px",
    color: "#111",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#555",
    fontWeight: "600",
  };

  const green = { borderLeft: "6px solid #22c55e" };
  const blue = { borderLeft: "6px solid #3b82f6" };
  const orange = { borderLeft: "6px solid #f97316" };
  const purple = { borderLeft: "6px solid #8b5cf6" };
  const emerald = { borderLeft: "6px solid #10b981" };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome Admin</h1>
      <p className="dashboard-subtitle">Overview of your system performance</p>

      {/* ===== STATS CARDS ===== */}
      <div
        className="stats-grid"
        style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "22px" }}
      >
        <div style={{ ...cardBase, ...green }}>
          <div style={countStyle}>{stats.totalUsers ?? 0}</div>
          <div style={labelStyle}>Total Users</div>
        </div>

        <div style={{ ...cardBase, ...blue }}>
          <div style={countStyle}>{stats.totalProducts ?? 0}</div>
          <div style={labelStyle}>Total Products</div>
        </div>

        <div style={{ ...cardBase, ...orange }}>
          <div style={countStyle}>{stats.totalBlogs ?? 0}</div>
          <div style={labelStyle}>Total Blogs</div>
        </div>

        <div style={{ ...cardBase, ...purple }}>
          <div style={countStyle}>{stats.totalOrders ?? 0}</div>
          <div style={labelStyle}>Total Orders</div>
        </div>

        <div style={{ ...cardBase, ...emerald }}>
          <div style={countStyle}>${stats.totalRevenue ?? 0}</div>
          <div style={labelStyle}>Total Revenue</div>
        </div>
      </div>

      {/* ===== LATEST USERS ===== */}
      <div className="section-card">
        <h2 className="section-heading">Latest Users</h2>

        {stats.latestUsers?.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {stats.latestUsers?.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== LATEST PRODUCTS ===== */}
      <div className="section-card">
        <h2 className="section-heading">Latest Products</h2>

        {stats.latestProducts?.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {stats.latestProducts?.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import socket from "../../socket";
// const AdminDashBoard = () => {
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:9696/admin/dashboard");
//       if (res.data?.success) {
//         setStats(res.data.stats || {});
//       }
//     } catch (err) {
//       console.log("Dashboard Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats(); // initial load

//     // ✅ REAL-TIME ORDER UPDATE
//     socket.on("orderPlaced", () => {
//       console.log("📦 New order received → refreshing dashboard");
//       fetchStats();
//     });

//     socket.on("orderRemoved", () => {
//       fetchStats();
//     });

//     socket.on("orderStatusUpdated", () => {
//       fetchStats();
//     });

//     // ✅ CLEANUP (VERY IMPORTANT)
//     return () => {
//       socket.off("orderPlaced");
//       socket.off("orderRemoved");
//       socket.off("orderStatusUpdated");
//     };
//   }, []);

//   if (loading) return <p>Loading dashboard...</p>;

//   /* ===== STYLES ===== */
//   const cardBase = {
//     padding: "16px",
//     minHeight: "95px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//     borderRadius: "14px",
//     background: "#fff",
//   };

//   const countStyle = {
//     fontSize: "26px",
//     fontWeight: "700",
//     marginBottom: "4px",
//     color: "#111",
//   };

//   const labelStyle = {
//     fontSize: "14px",
//     color: "#555",
//     fontWeight: "500",
//   };

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">Welcome Admin</h1>
//       <p className="dashboard-subtitle">Overview of your system performance</p>

//       <div
//         className="stats-grid"
//         style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}
//       >
//         <div style={cardBase}>
//           <div style={countStyle}>{stats.totalUsers ?? 0}</div>
//           <div style={labelStyle}>Total Users</div>
//         </div>

//         <div style={cardBase}>
//           <div style={countStyle}>{stats.totalProducts ?? 0}</div>
//           <div style={labelStyle}>Total Products</div>
//         </div>

//         <div style={cardBase}>
//           <div style={countStyle}>{stats.totalBlogs ?? 0}</div>
//           <div style={labelStyle}>Total Blogs</div>
//         </div>

//         <div style={cardBase}>
//           <div style={countStyle}>{stats.totalOrders ?? 0}</div>
//           <div style={labelStyle}>Total Orders</div>
//         </div>

//         <div style={cardBase}>
//           <div style={countStyle}>${stats.totalRevenue ?? 0}</div>
//           <div style={labelStyle}>Total Revenue</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashBoard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashBoard = () => {
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:9696/admin/dashboard");
//       if (res.data?.success) {
//         setStats(res.data.stats || {});
//       }
//     } catch (err) {
//       console.log("Dashboard Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;

//   /* ===== Card Styles ===== */
//   const cardBase = {
//     padding: "16px",
//     minHeight: "95px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//     borderRadius: "14px",
//     background: "#fff",
//   };

//   const countStyle = {
//     fontSize: "26px",
//     fontWeight: "700",
//     marginBottom: "4px",
//     color: "#111",
//   };

//   const labelStyle = {
//     fontSize: "14px",
//     color: "#555",
//     fontWeight: "500",
//   };

//   const greenBorder = { borderLeft: "6px solid #22c55e" };
//   const blueBorder = { borderLeft: "6px solid #3b82f6" };
//   const orangeBorder = { borderLeft: "6px solid #f97316" };
//   const purpleBorder = { borderLeft: "6px solid #8b5cf6" };
//   const emeraldBorder = { borderLeft: "6px solid #10b981" };

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">Welcome Admin</h1>
//       <p className="dashboard-subtitle">Overview of your system performance</p>

//       {/* ===== STATS ===== */}
//       <div
//         className="stats-grid"
//         style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}
//       >
//         <div style={{ ...cardBase, ...greenBorder }}>
//           <div style={countStyle}>{stats.totalUsers ?? 0}</div>
//           <div style={labelStyle}>Total Users</div>
//         </div>

//         <div style={{ ...cardBase, ...blueBorder }}>
//           <div style={countStyle}>{stats.totalProducts ?? 0}</div>
//           <div style={labelStyle}>Total Products</div>
//         </div>

//         <div style={{ ...cardBase, ...orangeBorder }}>
//           <div style={countStyle}>{stats.totalBlogs ?? 0}</div>
//           <div style={labelStyle}>Total Blogs</div>
//         </div>

//         <div style={{ ...cardBase, ...purpleBorder }}>
//           <div style={countStyle}>{stats.totalOrders ?? 0}</div>
//           <div style={labelStyle}>Total Orders</div>
//         </div>

//         <div style={{ ...cardBase, ...emeraldBorder }}>
//           <div style={countStyle}>${stats.totalRevenue ?? 0}</div>
//           <div style={labelStyle}>Total Revenue</div>
//         </div>
//       </div>

//       {/* ===== LATEST USERS ===== */}
//       <div className="section-card">
//         <h2 className="section-heading">Latest Users</h2>

//         {stats.latestUsers?.length === 0 ? (
//           <p>No users found.</p>
//         ) : (
//           <table className="dashboard-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stats.latestUsers?.map((u) => (
//                 <tr key={u._id}>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* ===== LATEST PRODUCTS ===== */}
//       <div className="section-card">
//         <h2 className="section-heading">Latest Products</h2>

//         {stats.latestProducts?.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           <table className="dashboard-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Price ($)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stats.latestProducts?.map((p) => (
//                 <tr key={p._id}>
//                   <td>{p.name}</td>
//                   <td>${p.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashBoard;
