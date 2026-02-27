import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import bgVideo from "../assets/bg_video.mp4";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

  // 📱 Phone Validation (10 digits only)
  const isPhoneValid = /^[0-9]{10}$/.test(phone);

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

    if (!isPasswordValid || !isMatch || !isPhoneValid) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      alert("Account already exists!");
      navigate("/login");
      return;
    }

    users.push({ email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* 🎥 Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover animate-slowZoom"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

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
              className="w-full p-3 mb-4 rounded-xl bg-white/20 
              placeholder-gray-300 focus:outline-none focus:ring-2 
              focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Phone */}
            <input
              type="text"
              placeholder="Phone Number"
              maxLength={10}
              required
              className="w-full p-3 mb-2 rounded-xl bg-white/20 
              placeholder-gray-300 focus:outline-none focus:ring-2 
              focus:ring-indigo-400 transition"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />

            <div className={`text-sm mb-4 font-medium ${
              isPhoneValid ? "text-green-400" : "text-red-400"
            }`}>
              {isPhoneValid
                ? "✅ Valid 10-digit phone number"
                : "❌ Enter valid 10-digit phone number"}
            </div>

            {/* Password */}
            <div className="relative mb-4">
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

            {/* Password Conditions */}
            <div className="space-y-2 mb-6 text-sm">
              <div className={passwordRules.length ? "text-green-400" : "text-red-400"}>
                {passwordRules.length ? "✅" : "❌"} Minimum 8 characters
              </div>
              <div className={passwordRules.uppercase ? "text-green-400" : "text-red-400"}>
                {passwordRules.uppercase ? "✅" : "❌"} One uppercase letter
              </div>
              <div className={passwordRules.number ? "text-green-400" : "text-red-400"}>
                {passwordRules.number ? "✅" : "❌"} One number
              </div>
              <div className={passwordRules.symbol ? "text-green-400" : "text-red-400"}>
                {passwordRules.symbol ? "✅" : "❌"} One special symbol
              </div>
              <div className={isMatch ? "text-green-400" : "text-red-400"}>
                {isMatch ? "✅" : "❌"} Passwords match
              </div>
            </div>

            <button
              disabled={!isPasswordValid || !isMatch || !isPhoneValid}
              className={`w-full p-3 rounded-xl font-semibold transition-all duration-300 ${
                isPasswordValid && isMatch && isPhoneValid
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