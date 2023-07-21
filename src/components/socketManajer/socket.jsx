import { io } from "socket.io-client";

//socket connection to backend
export const socket = io.connect(`${import.meta.env.VITE_SOCKET_IO_URL}`);
