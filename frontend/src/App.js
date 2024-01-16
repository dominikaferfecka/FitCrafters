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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check the local storage on component mount
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") !== null);
  }, [localStorage]);

  return (
    <>
      <Router>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/trainer" element={<TrainerPage />} />
            <Route path="/manager" element={<ManagerPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
