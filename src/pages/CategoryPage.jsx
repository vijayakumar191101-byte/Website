import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useCart } from "../context/CartContext";

// Temporary product data
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
  const { addToCart } = useCart(); // ✅ ADD THIS
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
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  const filteredProducts = products.filter(
    (product) => product.category === name
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-6 text-green-700">
        {name}
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-5 rounded-xl shadow hover:shadow-xl transition bg-white"
            >
              <h3 className="font-semibold text-lg mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-3">
                ${product.price}
              </p>

              <button
                onClick={() => addToCart(product)} // ✅ CONNECTED
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;