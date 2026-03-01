import { Home, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: Home, path: "/home" },
    { icon: ShoppingCart, path: "/cart" },
    { icon: User, path: "/profile" },
  ];

  return (
    <div
      className="
      fixed bottom-4 left-1/2 -translate-x-1/2
      w-[92%] max-w-md
      md:hidden
      z-50
    "
    >
      <div
        className="
        flex justify-around items-center
        py-3 px-4
        rounded-2xl
        backdrop-blur-2xl
        bg-white/70 dark:bg-slate-900/70
        border border-black/5 dark:border-white/10
        shadow-2xl
      "
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center cursor-pointer"
            >
              {/* Active Background */}
              {active && (
                <motion.div
                  layoutId="mobileActive"
                  className="
                  absolute -inset-3
                  rounded-xl
                  bg-gradient-to-r from-orange-500 to-yellow-400
                  opacity-20
                "
                />
              )}

              {/* Icon */}
              <Icon
                size={22}
                className={`
                  transition-all duration-300
                  ${
                    active
                      ? "text-orange-500 scale-110"
                      : "text-slate-600 dark:text-slate-300"
                  }
                `}
              />

              {/* Small Dot Indicator */}
              {active && (
                <motion.div
                  layoutId="dot"
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNav;