import { createContext, useContext, useState } from "react";
import { getProjects } from "../data/projects";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const all = [];
  const currentProjects = getProjects();

  currentProjects.forEach((p) => {
    (p.notifications || []).forEach((n) => {
      all.push({ ...n, projectName: p.name });
    });
  });

  const [notifications, setNotifications] = useState(all);

  function markAsSeen(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, seen: true } : n))
    );
  }

  function addNotification(n) {
    setNotifications((prev) => [n, ...prev]);
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsSeen, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
