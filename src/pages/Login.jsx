import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { loginUser } from "../api/authService";
import bgVideo from "../assets/bg_video.mp4";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      if (!token) {
        alert("Token not received ❌");
        return;
      }

      localStorage.setItem("token", token);

      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      navigate("/home");
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Server not reachable ❌");
      }
    } finally {
      setLoading(false);
    }
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="
          relative z-10
          w-full max-w-md
          p-10
          rounded-3xl
          backdrop-blur-2xl
          bg-white/10
          border border-white/20
          shadow-2xl
          text-white
        "
      >
        {/* Title */}
        <h2 className="
          text-3xl md:text-4xl font-bold text-center mb-8
          bg-gradient-to-r from-orange-400 to-amber-400
          bg-clip-text text-transparent
        ">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="
            w-full p-3 mb-5 rounded-xl
            bg-white/20
            placeholder-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-orange-400
            transition
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="
              w-full p-3 rounded-xl
              bg-white/20
              placeholder-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-orange-400
              transition
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="absolute right-4 top-3 cursor-pointer text-gray-200 hover:text-white transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-orange-500 to-amber-500
            hover:from-orange-600 hover:to-amber-600
            transition-all duration-300
            disabled:opacity-60
            flex justify-center items-center
          "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Login"
          )}
        </motion.button>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;