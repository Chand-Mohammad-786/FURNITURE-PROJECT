const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:9696"
    : "https://furniture-project-spox.onrender.com";

export default API_BASE;
