import { io } from "socket.io-client";

const socket = io("https://furniture-project-spox.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
});

export default socket;

// import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:9696";

// const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
//   autoConnect: true,
// });

// export default socket;
