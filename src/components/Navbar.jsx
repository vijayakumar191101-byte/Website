import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart(); // ✅ FIXED

  // 🔥 Professional: total quantity instead of unique items
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      
      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 font-bold text-xl cursor-pointer"
      >
        🛒 FreshMart
      </div>

      {/* Menu Links */}
      <div className="hidden md:flex gap-6 font-medium">
        <Link to="/home" className="hover:text-green-200">Home</Link>
        <Link to="/category/vegetables" className="hover:text-green-200">Vegetables</Link>
        <Link to="/category/fruits" className="hover:text-green-200">Fruits</Link>
        <Link to="/category/chips" className="hover:text-green-200">Chips</Link>
        <Link to="/category/beverages" className="hover:text-green-200">Beverages</Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6">

        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}  // ✅ go to cart
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </div>

        {/* Profile */}
        <User
          size={24}
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
        />
      </div>
    </nav>
  );
}

export default Navbar;