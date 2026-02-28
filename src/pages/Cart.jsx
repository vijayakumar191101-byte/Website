import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, getTotal } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-3xl font-semibold mb-6 text-slate-700 dark:text-white">
          Your Cart is Empty 🛒
        </h2>
        <button
          onClick={() => navigate("/home")}
          className="bg-orange-500 px-8 py-3 text-white rounded-xl 
          hover:scale-105 transition shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-slate-800 dark:text-white">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center
            backdrop-blur-xl bg-white/70 dark:bg-slate-800/50
            border border-white/20
            shadow-xl rounded-2xl p-6"
          >
            <div>
              <h2 className="text-xl font-semibold dark:text-white">
                {item.name}
              </h2>
              <p className="text-slate-500">${item.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-slate-200 dark:bg-slate-700
                w-8 h-8 rounded-full hover:bg-red-500
                hover:text-white transition"
              >
                -
              </button>

              <span className="text-lg font-bold dark:text-white">
                {item.qty}
              </span>

              <button
                onClick={() => increaseQty(item.id)}
                className="bg-slate-200 dark:bg-slate-700
                w-8 h-8 rounded-full hover:bg-teal-500
                hover:text-white transition"
              >
                +
              </button>
            </div>

            <div className="text-xl font-bold text-orange-500">
              ${item.price * item.qty}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 backdrop-blur-xl bg-white/70 dark:bg-slate-800/50
        border border-white/20 shadow-2xl rounded-2xl p-8"
      >
        <div className="flex justify-between text-xl mb-4 dark:text-white">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-3xl font-bold mb-6 dark:text-white">
          <span>Total</span>
          <span className="text-orange-500">${getTotal()}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-gradient-to-r from-teal-500 to-orange-500
          text-white py-4 rounded-2xl text-lg
          hover:scale-[1.02] transition shadow-lg"
        >
          Proceed to Checkout
        </button>
      </motion.div>
    </div>
  );
}

export default Cart;