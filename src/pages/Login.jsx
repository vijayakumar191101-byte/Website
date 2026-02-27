import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../api/authService";
import bgVideo from "../assets/bg_video.mp4";

function Login() {
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
      const response = await loginUser({
        email,
        password,
      });

      console.log("Login response:", response.data);

      alert("Login successful 🔥");

      // Navigate after successful login
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

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-8 md:p-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-4 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;