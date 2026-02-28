import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axiosConfig";

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/test/secure");
        setMessage(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-700 dark:text-slate-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      flex justify-center items-center
      px-6
      bg-gradient-to-br
      from-orange-50 to-white
      dark:from-slate-900 dark:to-slate-800
    ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md
          backdrop-blur-xl
          bg-white/70 dark:bg-slate-800/70
          border border-white/40 dark:border-slate-700
          shadow-2xl
          rounded-3xl
          p-10
          text-center
        "
      >
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="
            p-5
            rounded-full
            bg-gradient-to-r from-orange-500 to-amber-500
            shadow-lg
          ">
            <User size={42} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="
          text-2xl font-bold mb-2
          bg-gradient-to-r from-orange-500 to-amber-500
          bg-clip-text text-transparent
        ">
          User Profile
        </h1>

        {/* Message */}
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          {message || "Authenticated User"}
        </p>

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleLogout}
          className="
            w-full
            flex items-center justify-center gap-2
            bg-gradient-to-r from-orange-500 to-amber-500
            hover:from-orange-600 hover:to-amber-600
            text-white
            py-3
            rounded-xl
            font-medium
            shadow-lg
            transition-all
          "
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Profile;