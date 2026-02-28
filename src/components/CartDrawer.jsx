import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

function CartDrawer({ open, setOpen }) {
  const { cart, getTotal } = useCart();

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-96 
        bg-white dark:bg-slate-900 
        shadow-2xl z-50 p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.map(item => (
          <div key={item.id} className="flex justify-between mb-3">
            <span>{item.name} x{item.qty}</span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}

        <div className="mt-6 border-t pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>${getTotal()}</span>
        </div>
      </motion.div>
    </>
  );
}

export default CartDrawer;