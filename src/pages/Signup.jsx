import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import bgVideo from "../assets/bg_video.mp4";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [success, setSuccess] = useState(false);

  // 🔄 Redirect if already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) navigate("/home");
  }, [navigate]);

  // 🔐 Password Rules
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[@$!%*?&]/.test(password),
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.number &&
    passwordRules.symbol;

  const isMatch = password === confirmPassword && confirmPassword !== "";

  const handleSignup = (e) => {
    e.preventDefault();

    if (!isPasswordValid || !isMatch) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      alert("Account already exists!");
      navigate("/login");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);

    setTimeout(() => navigate("/login"), 2000);
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

      {/* 🧊 Glass Form */}
      <form
        onSubmit={handleSignup}
        className="relative z-10 w-[90%] max-w-md p-10 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20 
        shadow-2xl text-white animate-fadeSlide"
      >
        {success ? (
          <div className="flex flex-col items-center text-center">
            <CheckCircle size={90} className="text-green-400 animate-check" />
            <h2 className="mt-6 text-2xl font-semibold">
              Account Created Successfully!
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-center mb-8 premium-title">
              Create Account
            </h2>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 mb-5 rounded-xl bg-white/20 
              placeholder-gray-300 focus:outline-none focus:ring-2 
              focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full p-3 rounded-xl bg-white/20 
                placeholder-gray-300 focus:outline-none focus:ring-2 
                focus:ring-indigo-400 transition"
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

            {/* Confirm Password */}
            <div className="relative mb-6">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="w-full p-3 rounded-xl bg-white/20 
                placeholder-gray-300 focus:outline-none focus:ring-2 
                focus:ring-indigo-400 transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* 🔐 Password Conditions */}
            <div className="space-y-3 mb-6 text-sm">

              <div className={`flex gap-2 font-medium transition-all duration-300 ${
                passwordRules.length ? "text-green-400" : "text-red-400"
              }`}>
                {passwordRules.length ? "✅" : "❌"}
                {passwordRules.length
                  ? "Minimum 8 characters completed"
                  : "Minimum 8 characters required"}
              </div>

              <div className={`flex gap-2 font-medium transition-all duration-300 ${
                passwordRules.uppercase ? "text-green-400" : "text-red-400"
              }`}>
                {passwordRules.uppercase ? "✅" : "❌"}
                {passwordRules.uppercase
                  ? "Uppercase letter added"
                  : "At least one uppercase letter required"}
              </div>

              <div className={`flex gap-2 font-medium transition-all duration-300 ${
                passwordRules.number ? "text-green-400" : "text-red-400"
              }`}>
                {passwordRules.number ? "✅" : "❌"}
                {passwordRules.number
                  ? "Number added"
                  : "At least one number required"}
              </div>

              <div className={`flex gap-2 font-medium transition-all duration-300 ${
                passwordRules.symbol ? "text-green-400" : "text-red-400"
              }`}>
                {passwordRules.symbol ? "✅" : "❌"}
                {passwordRules.symbol
                  ? "Special symbol added"
                  : "At least one special symbol required"}
              </div>

              <div className={`flex gap-2 font-medium transition-all duration-300 ${
                isMatch ? "text-green-400" : "text-red-400"
              }`}>
                {isMatch ? "✅" : "❌"}
                {isMatch
                  ? "Passwords match"
                  : "Passwords do not match"}
              </div>

            </div>

            {/* Submit Button */}
            <button
              disabled={!isPasswordValid || !isMatch}
              className={`w-full p-3 rounded-xl font-semibold transition-all duration-300 ${
                isPasswordValid && isMatch
                  ? "btn-premium"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:underline">
                Login
              </Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Signup;