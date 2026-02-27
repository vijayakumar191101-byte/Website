import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import bgVideo from "../assets/bg_video.mp4";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content Card */}
      <div className="
        relative z-10 
        w-full 
        max-w-md 
        sm:max-w-lg 
        md:max-w-xl 
        p-6 
        sm:p-8 
        md:p-10 
        rounded-2xl
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20
        shadow-2xl 
        text-white 
        text-center 
        animate-fadeSlide
      ">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-indigo-600/30 backdrop-blur-lg">
            <User size={40} className="text-indigo-400" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Welcome Back 👋
        </h1>

        <p className="text-sm sm:text-base md:text-lg opacity-90 mb-8 break-words">
          {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="
          w-full 
          flex 
          items-center 
          justify-center 
          gap-2 
          px-6 
          py-3 
          rounded-xl 
          font-semibold 
          text-sm 
          sm:text-base
          bg-red-600 
          hover:bg-red-700 
          transition-all 
          duration-300
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;