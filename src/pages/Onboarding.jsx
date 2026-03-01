import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const slides = [
  {
    title: "Easy Shopping",
    description:
      "Browse thousands of products in organized categories and find everything you need quickly.",
    image: slide1,
  },
  {
    title: "Fresh Products",
    description:
      "Daily fresh vegetables & fruits from trusted sellers with quality checks at the best price.",
    image: slide2,
  },
  {
    title: "Simple Checkout",
    description:
      "Add items to cart, review your order, and complete secure checkout in seconds.",
    image: slide3,
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const total = slides.length;
  const isLast = current === total - 1;

  // ✅ 24-hour expiry check
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("onboardingData"));
    if (data) {
      const now = Date.now();
      if (now < data.expiry) {
        navigate("/login");
      } else {
        localStorage.removeItem("onboardingData");
      }
    }
  }, [navigate]);

  // ✅ Auto slide (stops at last)
  useEffect(() => {
    if (isLast) return;

    const id = setTimeout(() => setCurrent((c) => c + 1), 4500);
    return () => clearTimeout(id);
  }, [current, isLast]);

  const progress = useMemo(() => ((current + 1) / total) * 100, [current, total]);

  const finish = () => {
    setFadeOut(true);
    setTimeout(() => {
      const now = Date.now();
      const expiry = now + 24 * 60 * 60 * 1000;
      localStorage.setItem("onboardingData", JSON.stringify({ expiry }));
      navigate("/login");
    }, 600);
  };

  const next = () => {
    if (isLast) finish();
    else setCurrent((c) => c + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background slides */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Dark overlay + soft gradient */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />

      {/* Top progress */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip */}
      <button
        onClick={finish}
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-xl
        bg-white/10 border border-white/20 text-white text-sm
        backdrop-blur-xl hover:bg-white/20 transition"
      >
        Skip
      </button>

      {/* Center glass card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div
          className="
          w-full max-w-xl
          rounded-3xl
          bg-white/10 border border-white/15
          backdrop-blur-2xl
          shadow-2xl
          p-7 sm:p-10
          text-white
          "
        >
          {/* Small label */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-widest uppercase text-white/70">
              FreshMart • Onboarding
            </span>
            <span className="text-xs text-white/70">
              {current + 1} / {total}
            </span>
          </div>

          {/* Content */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-200 bg-clip-text text-transparent">
              {slides[current].title}
            </span>
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
            {slides[current].description}
          </p>

          {/* Dots */}
          <div className="flex gap-2 mb-8">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-10 bg-orange-400" : "w-2.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={current === 0}
              className="px-5 py-3 rounded-2xl bg-white/10 border border-white/15
              hover:bg-white/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <button
              onClick={next}
              className="flex-1 px-6 py-3 rounded-2xl font-semibold
              bg-gradient-to-r from-orange-500 to-yellow-400 text-black
              hover:brightness-110 transition"
            >
              {isLast ? "Get Started" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;