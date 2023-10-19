"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const socketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setsocket] = useState(null);
  const [isConnected, setisconnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      { path: "/api/socket/io", addTrailingSlash: false }
    );
    socketInstance.on("connect", () => {
      setisconnected(true);
    });
    socketInstance.on("disconnect", () => {
      setisconnected(false);
    });
    setsocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <socketContext.Provider value={{ socket, isConnected }}>
      {children}
    </socketContext.Provider>
  );
};
