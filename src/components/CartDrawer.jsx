import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartDrawer({ open, setOpen }) {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, getTotal } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const goCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ✅ Overlay */}
          <motion.div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ✅ Drawer */}
          <motion.div
            className="
              fixed right-0 top-0 h-full 
              w-[92%] sm:w-[420px]
              bg-white/90 dark:bg-slate-900/90
              backdrop-blur-2xl
              border-l border-black/5 dark:border-white/10
              shadow-2xl z-50
              p-6
              flex flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Your Cart
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                <X className="text-slate-800 dark:text-white" size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {cart.length === 0 ? (
                <div className="mt-10 text-center">
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">
                    Cart is empty 🛒
                  </p>
                  <p className="text-sm mt-2 text-slate-500 dark:text-slate-300">
                    Add some items to see them here.
                  </p>

                  <button
                    onClick={() => setOpen(false)}
                    className="
                      mt-6 px-5 py-3 rounded-2xl
                      bg-gradient-to-r from-orange-500 to-yellow-400
                      text-black font-semibold
                      hover:brightness-110 transition
                    "
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="
                      flex items-center justify-between gap-3
                      p-4 rounded-2xl
                      bg-white/60 dark:bg-white/5
                      border border-black/5 dark:border-white/10
                    "
                  >
                    {/* Left */}
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        ${item.price} each
                      </p>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 hover:scale-105 transition flex items-center justify-center"
                      >
                        <Minus size={16} className="text-slate-900 dark:text-white" />
                      </button>

                      <span className="w-6 text-center font-bold text-slate-900 dark:text-white">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 hover:scale-105 transition flex items-center justify-center"
                      >
                        <Plus size={16} className="text-slate-900 dark:text-white" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-bold text-slate-900 dark:text-white">
                      ${item.price * item.qty}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="pt-5 mt-5 border-t border-black/5 dark:border-white/10">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span className="text-slate-800 dark:text-white">Total</span>
                  <span className="text-orange-500">${getTotal()}</span>
                </div>

                <button
                  onClick={goCheckout}
                  className="
                    w-full py-3 rounded-2xl font-semibold
                    bg-gradient-to-r from-orange-500 to-yellow-400
                    text-black hover:brightness-110 transition
                  "
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;