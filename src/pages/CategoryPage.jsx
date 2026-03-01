import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Tomato", category: "vegetables", price: 2 },
  { id: 2, name: "Potato", category: "vegetables", price: 1.5 },
  { id: 3, name: "Apple", category: "fruits", price: 3 },
  { id: 4, name: "Banana", category: "fruits", price: 2 },
  { id: 5, name: "Lays Chips", category: "chips", price: 4 },
  { id: 6, name: "Orange Juice", category: "beverages", price: 5 },
];

function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/api/test/secure");
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) return null;

  const filtered = products.filter((p) => p.category === name);

  return (
    <div className="min-h-screen px-6 md:px-12 pb-20">
      <h1 className="text-4xl font-bold mb-10 capitalize">
        {name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <motion.div
            whileHover={{ y: -6 }}
            key={product.id}
            className="glass rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-2">
              {product.name}
            </h3>

            <p className="mb-4 text-slate-500 dark:text-slate-300">
              ${product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;