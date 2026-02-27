import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bgVideo from "../assets/bg_video.mp4";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) navigate("/home");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      setError("No account found. Please signup.");
      setTimeout(() => navigate("/signup"), 1500);
      return;
    }

    const cleanInput = identifier.replace(/\D/g, "");

    const matchedUser = users.find((user) => {
      const userPhone = user.phone || "";
      return (
        user.email === identifier ||
        userPhone === cleanInput
      );
    });

    if (!matchedUser) {
      setError("User not found");
      return;
    }

    if (matchedUser.password !== password) {
      setError("Incorrect password");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        email: matchedUser.email,
        phone: matchedUser.phone,
      })
    );

    navigate("/home");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <form
        onSubmit={handleLogin}
        className="
        relative z-10 
        w-full 
        max-w-md 
        sm:max-w-lg 
        p-6 
        sm:p-8 
        md:p-10 
        rounded-2xl
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 
        shadow-2xl 
        text-white 
        animate-fadeSlide
        "
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-400 text-xs sm:text-sm mb-4 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Email or Phone */}
        <input
          type="text"
          placeholder="Enter Email or Phone Number"
          required
          className="
          w-full 
          p-3 
          mb-4 
          rounded-xl 
          bg-white/20 
          placeholder-gray-300 
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-400 
          transition 
          text-sm 
          sm:text-base
          "
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="
            w-full 
            p-3 
            rounded-xl 
            bg-white/20 
            placeholder-gray-300 
            focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-400 
            transition 
            text-sm 
            sm:text-base
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-4 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <button
          className="
          w-full 
          p-3 
          rounded-xl 
          font-semibold 
          text-sm 
          sm:text-base
          bg-indigo-600 
          hover:bg-indigo-700 
          transition-all 
          duration-300
          "
        >
          Login
        </button>

        <p className="text-center mt-6 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;