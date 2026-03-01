import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { motion } from "framer-motion";

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/test/secure");
        setMessage(res.data);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex justify-center items-center px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-10 shadow-xl w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 p-4 rounded-full">
            <User size={36} className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">
          User Profile
        </h2>

        <p className="mb-8 text-slate-500 dark:text-slate-300">
          {message}
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </motion.div>
    </div>
  );
}

export default Profile;