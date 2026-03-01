import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-orange-500 text-white p-8 rounded-full shadow-xl"
      >
        <CheckCircle size={60} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold mt-8"
      >
        Order Placed Successfully!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-slate-500 dark:text-slate-300 mt-4"
      >
        Thank you for shopping with FreshMart.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => navigate("/home")}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
      >
        Continue Shopping
      </motion.button>
    </div>
  );
}

export default OrderSuccess;