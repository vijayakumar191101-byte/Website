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
        <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/home")}
          className="bg-green-600 px-6 py-3 text-white rounded-xl hover:scale-105 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-500">${item.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-200 w-8 h-8 rounded-full hover:bg-red-500 hover:text-white transition"
              >
                -
              </button>

              <span className="text-lg font-bold">{item.qty}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-200 w-8 h-8 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                +
              </button>
            </div>

            <div className="text-xl font-bold text-green-600">
              ${item.price * item.qty}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 bg-white shadow-xl rounded-2xl p-8"
      >
        <div className="flex justify-between text-xl mb-4">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-3xl font-bold mb-6">
          <span>Total</span>
          <span className="text-green-600">${getTotal()}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg hover:scale-[1.02] transition"
        >
          Proceed to Checkout
        </button>
      </motion.div>
    </div>
  );
}

export default Cart;