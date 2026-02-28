import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="bg-green-500 text-white p-10 rounded-full text-4xl"
      >
        ✓
      </motion.div>

      <h2 className="text-3xl font-bold mt-6">
        Order Placed Successfully!
      </h2>

      <button
        onClick={() => navigate("/home")}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;