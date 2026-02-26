import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bgVideo from "../assets/bg_video.mp4";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🚀 Auto redirect if already logged in
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

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ email: matchedUser.email })
      );
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover animate-slowZoom"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🧊 Glass Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-[90%] max-w-md p-10 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20 
        shadow-2xl text-white animate-fadeSlide"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/20 
          placeholder-gray-300 focus:outline-none focus:ring-2 
          focus:ring-indigo-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-white/20 
            placeholder-gray-300 focus:outline-none focus:ring-2 
            focus:ring-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <button
          className="w-full p-3 rounded-lg font-semibold 
          bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;