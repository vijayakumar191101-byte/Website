import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Moon, Sun, Menu, Monitor, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // ✅ now exists in CartContext
  const { theme, setTheme } = useTheme();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const panelRef = useRef(null);

  const links = [
    { name: "Home", path: "/home" },
    { name: "Vegetables", path: "/category/vegetables" },
    { name: "Fruits", path: "/category/fruits" },
    { name: "Snacks", path: "/category/chips" },
    { name: "Drinks", path: "/category/beverages" },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!openMobileMenu) return;

    const handler = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) setOpenMobileMenu(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMobileMenu]);

  // 3-mode theme cycle: light -> dark -> system -> light
  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const ThemeIcon =
    theme === "dark" ? Sun : theme === "light" ? Moon : Monitor;

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          fixed top-4 left-1/2 -translate-x-1/2
          w-[95%] md:w-[85%] lg:w-[75%]
          glass shadow-xl rounded-2xl
          px-5 sm:px-8 py-4
          flex justify-between items-center
          z-50
        "
      >
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/home")}
          className="
            text-xl font-bold cursor-pointer
            bg-gradient-to-r from-teal-400 to-orange-500
            bg-clip-text text-transparent select-none
          "
        >
          FreshMart
        </motion.div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative transition ${
                  isActive
                    ? "text-orange-500"
                    : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
                }`
              }
            >
              {item.name}
              {/* Single underline (fixed — no duplicates) */}
              <span
                className="
                  absolute left-0 -bottom-1 h-[2px] w-0
                  bg-orange-500 transition-all duration-300
                  group-hover:w-full
                "
              />
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpenMobileMenu((v) => !v)}
            className="md:hidden text-slate-700 dark:text-slate-200"
            aria-label="Open menu"
          >
            {openMobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* THEME TOGGLE */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={cycleTheme}
            className="text-slate-700 dark:text-slate-200"
            title={`Theme: ${theme} (click to change)`}
            aria-label="Theme toggle"
          >
            <ThemeIcon size={20} />
          </motion.button>

          {/* CART */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer text-slate-700 dark:text-slate-200"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="
                  absolute -top-2 -right-2
                  bg-orange-500 text-white text-xs
                  px-2 py-0.5 rounded-full shadow-md
                "
              >
                {totalItems}
              </motion.span>
            )}
          </motion.div>

          {/* PROFILE */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/profile")}
            className="cursor-pointer text-slate-700 dark:text-slate-200"
            aria-label="Profile"
          >
            <User size={22} />
          </motion.div>
        </div>
      </motion.nav>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {openMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] z-50 md:hidden"
          >
            <div ref={panelRef} className="glass rounded-2xl p-4 shadow-xl">
              <div className="flex flex-col gap-2">
                {links.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpenMobileMenu(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl transition ${
                        isActive
                          ? "bg-orange-500/20 text-orange-500"
                          : "text-slate-700 dark:text-slate-200 hover:bg-white/10"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* small hint for theme */}
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-300">
                Theme: <span className="font-semibold">{theme}</span> (tap icon to cycle)
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;