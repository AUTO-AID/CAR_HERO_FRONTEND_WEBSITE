import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const getSocketUrl = () => {
  const configuredApiBase = import.meta.env.VITE_API_BASE_URL;
  if (configuredApiBase && !configuredApiBase.includes("localhost:3000")) {
    try {
      const url = new URL(configuredApiBase);
      return `${url.protocol}//${url.host}/notifications`;
    } catch {
      return "http://localhost:3001/notifications";
    }
  }
  return "http://localhost:3001/notifications";
};

export function useSocket() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Support common token storage keys
    const token = localStorage.getItem("access_token") || localStorage.getItem("token") || localStorage.getItem("customer_token");

    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const socketUrl = getSocketUrl();
    console.log(`[Socket] Connecting to ${socketUrl}...`);

    const client = io(socketUrl, {
      auth: { token: `Bearer ${token}` },
      transports: ["polling", "websocket"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketRef.current = client;
    setSocket(client);

    client.on("connect", () => {
      console.log(`[Socket] Connected successfully: ${client.id}`);
      setIsConnected(true);
      
      client.emit("join_notifications", {}, (response) => {
        console.log("[Socket] Joined notifications channel:", response);
      });
    });

    client.on("disconnect", (reason) => {
      console.log(`[Socket] Disconnected: ${reason}`);
      setIsConnected(false);
    });

    return () => {
      console.log("[Socket] Cleaning up connection...");
      client.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  return { socket, isConnected };
}
