import { io } from "socket.io-client";
import { env } from "../../config/env";
//socket connection to backend
export const socket = io.connect(env.socketIo);
