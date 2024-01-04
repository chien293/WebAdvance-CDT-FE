import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const url = process.env.SOCKET_URL || "http://localhost:3500";

export const useSocket = () => {
  return useContext(SocketContext);
};

const socket = io(url);

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
