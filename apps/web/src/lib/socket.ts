import { io, Socket } from "socket.io-client";
import { getAccessToken } from "./api";

const url =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket && socket.connected) return socket;
  socket = io(url, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: true,
    auth: (cb) => cb({ token: getAccessToken() ?? "" }),
  });
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
