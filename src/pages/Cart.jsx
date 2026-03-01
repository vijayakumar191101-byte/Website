import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, getTotal, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Your Cart is Empty 🛒
        </h2>
        <button
          onClick={() => navigate("/home")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-12 pb-20">
      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 shadow-xl flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-300">
                ${item.price}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQty(item.id)}
                className="w-8 h-8 rounded-full bg-red-400 dark:bg-slate-700"
              >
                -
              </button>

              <span className="font-bold text-lg">
                {item.qty}
              </span>

              <button
                onClick={() => increaseQty(item.id)}
                className="w-8 h-8 rounded-full bg-green-400 dark:bg-slate-700"
              >
                +
              </button>
            </div>

            <div className="font-bold text-orange-500">
              ${item.price * item.qty}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl p-8 mt-10 shadow-xl"
      >
        <div className="flex justify-between text-lg mb-4">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-3xl font-bold mb-6">
          <span>Total</span>
          <span className="text-orange-500">
            ${getTotal()}
          </span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg"
        >
          Proceed to Checkout
        </button>
      </motion.div>
    </div>
  );
}

export default Cart;