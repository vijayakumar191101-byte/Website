import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding */}
        <Route path="/" element={<Onboarding />} />

        {/* Signup */}
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* Protected Home */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;