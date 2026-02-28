import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpg";

const slides = [
  {
    title: "Easy Shopping",
    description:
      "Browse thousands of products in organized categories and find everything you need quickly without wasting time searching different stores.",
    image: slide1,
  },
  {
    title: "Fresh Products",
    description:
      "Get fresh vegetables and fruits delivered daily from trusted local sellers to your doorstep with quality checks and affordable prices.",
    image: slide2,
  },
  {
    title: "Simple Checkout",
    description:
      "Add items to your cart, review your order, and complete secure checkout in just a few simple steps without any confusion.",
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
      if (now < data.expiry) {
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
      const expiry = now + 24 * 60 * 60 * 1000;

      localStorage.setItem("onboardingData", JSON.stringify({ expiry }));

      navigate("/login");
    }, 700);
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 z-50">
        <div
          className="h-full bg-white transition-all duration-[3000ms] ease-linear"
          style={{
            width: `${((current + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Slides */}
      <div
        className="flex min-h-screen transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-h-screen w-full flex-shrink-0 bg-cover bg-center flex items-center justify-center px-4 sm:px-8"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Content */}
            <div className="relative text-center text-white max-w-3xl animate-fadeIn">
              <h1
                className="
                text-2xl 
                sm:text-3xl 
                md:text-4xl 
                lg:text-5xl 
                xl:text-6xl 
                font-bold 
                mb-4 
                leading-tight
              "
              >
                {slide.title}
              </h1>

              <p
                className="
                text-sm 
                sm:text-base 
                md:text-lg 
                lg:text-xl 
                opacity-90
              "
              >
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="
          absolute 
          top-4 
          right-4 
          sm:top-6 
          sm:right-6
          bg-white/20 
          backdrop-blur-lg 
          text-white 
          text-sm 
          sm:text-base
          px-3 
          sm:px-5 
          py-2 
          rounded-lg 
          border border-white/30
          hover:bg-white/40 
          transition-all 
          duration-300
        "
      >
        Skip
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-10 w-full flex justify-center gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Onboarding;
