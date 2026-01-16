import { io } from "socket.io-client";

const socket = io("https://furniture-project-spox.onrender.com", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

export default socket;
