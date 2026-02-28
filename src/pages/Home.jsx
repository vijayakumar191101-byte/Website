import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axiosConfig";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Tomato", category: "vegetables", price: 2 },
  { id: 2, name: "Potato", category: "vegetables", price: 1.5 },
  { id: 3, name: "Apple", category: "fruits", price: 3 },
  { id: 4, name: "Banana", category: "fruits", price: 2 },
  { id: 5, name: "Lays Chips", category: "chips", price: 4 },
  { id: 6, name: "Orange Juice", category: "beverages", price: 5 },
];

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/api/test/secure");
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-20 text-center text-lg text-slate-700 dark:text-slate-200">
        Loading...
      </div>
    );
  }

  const categories = ["vegetables", "fruits", "chips", "beverages"];

  return (
    <div className="px-6 md:px-14 py-10 space-y-20">
      {categories.map((cat) => (
        <section key={cat} className="space-y-8">
          
          {/* CATEGORY TITLE */}
          <div className="flex items-center justify-between">
            <h2 className="
              text-3xl md:text-4xl font-bold capitalize
              bg-gradient-to-r from-orange-500 to-amber-500
              bg-clip-text text-transparent
            ">
              {cat}
            </h2>

            <button
              onClick={() => navigate(`/category/${cat}`)}
              className="text-sm font-medium text-orange-500 hover:underline"
            >
              View All →
            </button>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products
              .filter((p) => p.category === cat)
              .map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6 }}
                  className="
                    group
                    rounded-2xl
                    p-6
                    shadow-md hover:shadow-2xl
                    transition-all duration-300
                    bg-white dark:bg-slate-800
                    border border-slate-200 dark:border-slate-700
                  "
                >
                  {/* PRODUCT NAME */}
                  <h3 className="
                    font-semibold text-lg mb-2
                    text-slate-800 dark:text-slate-100
                  ">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <p className="
                    text-slate-500 dark:text-slate-400 mb-5
                  ">
                    ${product.price}
                  </p>

                  {/* BUTTON */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="
                      w-full
                      bg-gradient-to-r from-orange-500 to-amber-500
                      hover:from-orange-600 hover:to-amber-600
                      text-white
                      py-2.5
                      rounded-xl
                      font-medium
                      shadow-md
                      transition-all
                    "
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Home;