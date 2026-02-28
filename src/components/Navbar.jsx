import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Moon, Sun } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { theme, setTheme } = useTheme();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
      fixed top-4 left-1/2 -translate-x-1/2
      w-[95%] md:w-[85%] lg:w-[75%]
      glass
      shadow-xl
      rounded-2xl
      px-8 py-4
      flex justify-between items-center
      z-50"
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/home")}
        className="
        text-xl font-bold cursor-pointer
        bg-gradient-to-r from-teal-400 to-orange-500
        bg-clip-text text-transparent"
      >
        FreshMart
      </div>

      {/* MENU */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        {[
          { name: "Home", path: "/home" },
          { name: "Vegetables", path: "/category/vegetables" },
          { name: "Fruits", path: "/category/fruits" },
          { name: "Snacks", path: "/category/chips" },
          { name: "Drinks", path: "/category/beverages" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="relative group text-slate-700 dark:text-slate-200"
          >
            {item.name}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* THEME TOGGLE */}
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="text-slate-700 dark:text-slate-200"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* CART */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer text-slate-700 dark:text-slate-200"
        >
          <ShoppingCart size={22} />

          {totalItems > 0 && (
            <span className="
              absolute -top-2 -right-2
              bg-orange-500 text-white text-xs
              px-2 py-0.5 rounded-full
            ">
              {totalItems}
            </span>
          )}
        </div>

        {/* PROFILE */}
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer text-slate-700 dark:text-slate-200"
        >
          <User size={22} />
        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;