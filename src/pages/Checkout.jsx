import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();
  const [address, setAddress] = useState("");

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    alert("Order placed successfully 🎉");
    navigate("/home");
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-3xl font-semibold">No items to checkout</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

      {/* Order Summary */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-3">
            <span>{item.name} x{item.qty}</span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}

        <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span className="text-green-600">${getTotal()}</span>
        </div>
      </motion.div>

      {/* Delivery Info */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full delivery address..."
          className="w-full border rounded-xl p-4 mb-6 focus:ring-2 focus:ring-green-500 outline-none"
          rows="4"
        />

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg hover:scale-[1.02] transition"
        >
          Place Order
        </button>
      </motion.div>
    </div>
  );
}

export default Checkout;