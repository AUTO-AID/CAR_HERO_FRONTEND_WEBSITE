import React, { createContext, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Snackbar, Alert } from "@mui/material";

const RealTimeNotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { socket } = useSocket();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notif) => {
      console.log("[NotificationProvider] Received notification:", notif);
      setNotification(notif);
      playOrderChime();
    };

    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const handleClose = () => setNotification(null);

  return (
    <RealTimeNotificationContext.Provider value={{ notification }}>
      {children}
      <Snackbar 
        open={Boolean(notification)} 
        autoHideDuration={8000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {notification ? (
          <Alert onClose={handleClose} severity={getSeverity(notification.type)} sx={{ width: '100%', direction: 'rtl', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>
              {notification.title || "تنبيه جديد"}
            </strong>
            {notification.body || "لديك إشعار جديد"}
          </Alert>
        ) : <div />}
      </Snackbar>
    </RealTimeNotificationContext.Provider>
  );
}

function getSeverity(type) {
  if (!type) return "info";
  const t = type.toLowerCase();
  if (t.includes("success") || t.includes("completed") || t.includes("accepted")) return "success";
  if (t.includes("error") || t.includes("failed") || t.includes("rejected")) return "error";
  if (t.includes("warning")) return "warning";
  return "info";
}

function playOrderChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch {
    // Ignore audio errors
  }
}
