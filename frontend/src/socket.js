// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9696";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
