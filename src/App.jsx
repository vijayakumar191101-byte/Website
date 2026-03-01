import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Navbar only when logged in */}
          {isLoggedIn && <Navbar />}

          {/* ✅ Padding only for logged-in pages */}
          <div className={isLoggedIn ? "pt-28 pb-24" : ""}>
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

              {/* Protected Routes */}
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />

              <Route
                path="/category/:name"
                element={isLoggedIn ? <CategoryPage /> : <Navigate to="/login" />}
              />

              <Route
                path="/cart"
                element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
              />

              <Route
                path="/checkout"
                element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
              />

              <Route
                path="/success"
                element={isLoggedIn ? <OrderSuccess /> : <Navigate to="/login" />}
              />

              <Route
                path="/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>

          {/* MobileNav only when logged in */}
          {isLoggedIn && <MobileNav />}
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;