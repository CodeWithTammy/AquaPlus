import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      // 15 minutes in milliseconds = 15 * 60 * 1000
      inactivityTimer = setTimeout(() => {
        signOut(auth); // auto logout after 15 minutes
        setIsAuthenticated(false);
      }, 15 * 60 * 1000);
    };

    // List of events that count as "activity"
    const activityEvents = ["mousemove", "keydown", "scroll", "click"];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        resetTimer(); // start inactivity timer
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/Login" replace />;
};

export default AdminRoute;
