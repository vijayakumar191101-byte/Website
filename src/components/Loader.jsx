import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center 
    bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl z-50">

      <div className="relative flex items-center justify-center">

        {/* Outer Rotating Gradient Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="
            w-20 h-20
            rounded-full
            bg-gradient-to-tr from-orange-500 via-yellow-400 to-orange-500
            p-[3px]
          "
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900" />
        </motion.div>

        {/* Inner Pulse Dot */}
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="
            absolute
            w-4 h-4
            rounded-full
            bg-orange-500
            shadow-lg
          "
        />

      </div>

    </div>
  );
}

export default Loader;