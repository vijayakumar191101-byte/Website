import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
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
      setTimeout(() => navigate("/login"), 1600);
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert("Server not reachable ❌");
    } finally {
      setLoading(false);
    }
  };

  const Rule = ({ ok, label }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className={ok ? "text-emerald-400" : "text-rose-400"}>
        {ok ? "✅" : "❌"}
      </span>
      <span className="text-white/80">{label}</span>
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <form
        onSubmit={handleSignup}
        className="
          relative z-10 w-full max-w-md
          rounded-3xl border border-white/15
          bg-white/10 backdrop-blur-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          p-6 sm:p-8
          text-white
          animate-fadeSlide
        "
      >
        {success ? (
          <div className="flex flex-col items-center text-center py-10">
            <CheckCircle size={84} className="text-emerald-400 animate-bounce" />
            <h2 className="mt-6 text-xl sm:text-2xl font-semibold">
              Account Created!
            </h2>
            <p className="mt-2 text-white/70 text-sm">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
              Create Account
            </h2>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              required
              className="
                w-full rounded-xl bg-white/15
                px-4 py-3 mb-4
                placeholder:text-white/50
                outline-none
                ring-1 ring-white/10
                focus:ring-2 focus:ring-orange-400/70
                transition
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Phone */}
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="
                  rounded-xl bg-white/15 px-4 py-3
                  ring-1 ring-white/10 outline-none
                  focus:ring-2 focus:ring-orange-400/70
                  sm:w-36
                "
              >
                {countries.map((c, idx) => (
                  <option key={idx} value={c.code} className="text-black">
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Phone Number"
                maxLength={12}
                required
                className="
                  flex-1 rounded-xl bg-white/15
                  px-4 py-3
                  placeholder:text-white/50
                  outline-none
                  ring-1 ring-white/10
                  focus:ring-2 focus:ring-orange-400/70
                  transition
                "
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>

            <div
              className={`text-sm mb-4 ${
                isPhoneValid ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isPhoneValid
                ? "✅ Valid phone number"
                : "❌ Enter valid 10-digit number"}
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="
                  w-full rounded-xl bg-white/15
                  px-4 py-3 pr-12
                  placeholder:text-white/50
                  outline-none
                  ring-1 ring-white/10
                  focus:ring-2 focus:ring-orange-400/70
                  transition
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-5">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="
                  w-full rounded-xl bg-white/15
                  px-4 py-3 pr-12
                  placeholder:text-white/50
                  outline-none
                  ring-1 ring-white/10
                  focus:ring-2 focus:ring-orange-400/70
                  transition
                "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Password Rules */}
            <div className="rounded-2xl bg-black/20 border border-white/10 p-4 mb-6 space-y-2">
              <Rule ok={passwordRules.length} label="Minimum 8 characters" />
              <Rule ok={passwordRules.uppercase} label="One uppercase letter" />
              <Rule ok={passwordRules.number} label="One number" />
              <Rule ok={passwordRules.symbol} label="One special symbol" />
              <Rule ok={isMatch} label="Passwords match" />
            </div>

            {/* Button */}
            <button
              disabled={!isPasswordValid || !isMatch || !isPhoneValid || loading}
              className={`
                w-full rounded-2xl py-3 font-semibold
                transition-all duration-300
                ${
                  isPasswordValid && isMatch && isPhoneValid && !loading
                    ? "bg-gradient-to-r from-orange-500 to-amber-400 hover:brightness-110 shadow-lg shadow-orange-500/20"
                    : "bg-white/15 text-white/60 cursor-not-allowed"
                }
              `}
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Creating...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center mt-6 text-sm text-white/80">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-300 hover:underline">
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