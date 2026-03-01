import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();
  const [address, setAddress] = useState("");

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-semibold">
          No items to checkout
        </h2>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    navigate("/success");
  };

  return (
    <div className="min-h-screen px-6 md:px-12 pb-20 grid md:grid-cols-2 gap-10">

      {/* Order Summary */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="glass rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-3">
            <span>
              {item.name} x{item.qty}
            </span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}

        <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span className="text-orange-500">
            ${getTotal()}
          </span>
        </div>
      </motion.div>

      {/* Delivery Details */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="glass rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">
          Delivery Details
        </h2>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter full delivery address..."
          rows="4"
          className="w-full rounded-xl p-4 mb-6 bg-slate-100 dark:bg-slate-800 outline-none"
        />

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg"
        >
          Place Order
        </button>
      </motion.div>
    </div>
  );
}

export default Checkout;