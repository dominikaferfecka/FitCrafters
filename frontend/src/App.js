import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FrontPage from "./components/FrontPage";
import ClientPage from "./components/ClientPage";
import TrainerPage from "./components/TrainerPage";
import ManagerPage from "./components/ManagerPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update the login state
  };

  return (
    <>
      <Router>
        {isLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={<FrontPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/client"
              element={<ClientPage onLogout={handleLogout} />}
            />
            <Route
              path="/trainer"
              element={<TrainerPage onLogout={handleLogout} />}
            />
            <Route
              path="/manager"
              element={<ManagerPage onLogout={handleLogout} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<FrontPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
