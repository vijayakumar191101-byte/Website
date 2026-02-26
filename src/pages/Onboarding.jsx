import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpg";

const slides = [
  {
    title: "Welcome to VK App",
    description: "Your journey begins here.",
    image: slide1,
  },
  {
    title: "Fast & Modern UI",
    description: "Built with React & Tailwind CSS.",
    image: slide2,
  },
  {
    title: "Secure Backend",
    description: "Powered by Spring Boot.",
    image: slide3,
  },
];

function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  // 24-hour expiry check
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("onboardingData"));

    if (data) {
      const now = new Date().getTime();
      const expiry = data.expiry;

      if (now < expiry) {
        navigate("/login");
      } else {
        localStorage.removeItem("onboardingData");
      }
    }
  }, [navigate]);

  // Auto slide logic
  useEffect(() => {
    if (current === slides.length - 1) {
      const timeout = setTimeout(() => {
        handleFinish();
      }, 3000);

      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [current]);

  const handleFinish = () => {
    setFadeOut(true);

    setTimeout(() => {
      const now = new Date().getTime();
      const expiry = now + 24 * 60 * 60 * 1000; // 24 hours

      localStorage.setItem(
        "onboardingData",
        JSON.stringify({ expiry })
      );

      navigate("/login");
    }, 700); // match fade duration
  };

  const handleSkip = () => {
    handleFinish();
  };

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 z-50">
        <div
          className="h-full bg-white transition-all duration-3000 ease-linear"
          style={{
            width: `${((current + 1) / slides.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-screen w-full flex-shrink-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative text-center text-white px-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/50 transition"
      >
        Skip
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Onboarding;