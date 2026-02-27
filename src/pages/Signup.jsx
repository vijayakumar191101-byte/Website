import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { signupUser } from "../api/authService";
import bgVideo from "../assets/bg_video.mp4";

const countries = [
  { name: "IN", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "CA", code: "+1" },
  { name: "AUS", code: "+61" },
];

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Phone validation
  const rawPhone = phone.replace(/\D/g, "");
  const isPhoneValid = rawPhone.length === 10;

  const formatPhone = (number) => {
    const digits = number.replace(/\D/g, "");
    if (digits.length <= 5) return digits;
    return digits.slice(0, 5) + " " + digits.slice(5, 10);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 10) setPhone(formatPhone(input));
  };

  // Password rules
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

  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isPasswordValid || !isMatch || !isPhoneValid) return;

    setLoading(true);

    try {
      await signupUser({
        email,
        password,
        phone: rawPhone,
        countryCode,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

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
        onSubmit={handleSignup}
        className="relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-8 md:p-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white"
      >
        {success ? (
          <div className="flex flex-col items-center text-center py-10">
            <CheckCircle size={80} className="text-green-400 animate-bounce" />
            <h2 className="mt-6 text-xl sm:text-2xl font-semibold">
              Account Created Successfully!
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
              Create Account
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

            {/* Phone */}
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="p-3 rounded-xl bg-white/20 sm:w-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {countries.map((c, idx) => (
                  <option key={idx} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Phone Number"
                maxLength={12}
                required
                className="flex-1 p-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>

            <div className={`text-sm mb-4 ${isPhoneValid ? "text-green-400" : "text-red-400"}`}>
              {isPhoneValid ? "✅ Valid phone number" : "❌ Enter valid 10-digit number"}
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

            {/* Confirm Password */}
            <div className="relative mb-6">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>

            {/* Password Rules */}
            <div className="space-y-1 mb-6 text-sm">
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

            {/* Button */}
            <button
              disabled={!isPasswordValid || !isMatch || !isPhoneValid || loading}
              className={`w-full p-3 rounded-xl font-semibold transition-all duration-300 ${
                isPasswordValid && isMatch && isPhoneValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating..." : "Sign Up"}
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