import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-12 h-12 border-4 border-green-500 
        border-t-transparent rounded-full"
      />
    </div>
  );
}

export default Loader;