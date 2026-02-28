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
import OrderSuccess from "./pages/OrderSuccess"; // ✅ NEW

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav"; // ✅ NEW

import { CartProvider } from "./context/CartContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔐 Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>

        {/* Layout Wrapper */}
        {isLoggedIn && <Navbar />}

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

          {/* Protected Category */}
          <Route
            path="/category/:name"
            element={isLoggedIn ? <CategoryPage /> : <Navigate to="/login" />}
          />

          {/* Protected Cart */}
          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
          />

          {/* Protected Checkout */}
          <Route
            path="/checkout"
            element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
          />

          {/* ✅ Order Success Page */}
          <Route
            path="/success"
            element={isLoggedIn ? <OrderSuccess /> : <Navigate to="/login" />}
          />

          {/* Protected Profile */}
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

        {/* ✅ Mobile Bottom Navigation (only logged in) */}
        {isLoggedIn && <MobileNav />}

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;