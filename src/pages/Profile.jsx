import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
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
    window.location.reload(); // reset login state
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-100 rounded-full">
            <User size={40} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">User Profile</h1>

        <p className="text-gray-600 mb-6">
          {message || "Authenticated User"}
        </p>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;