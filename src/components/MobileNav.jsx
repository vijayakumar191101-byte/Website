import { Home, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MobileNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 
    bg-white dark:bg-slate-900 
    shadow-xl flex justify-around py-3 md:hidden">

      <Home onClick={() => navigate("/home")} />
      <ShoppingCart onClick={() => navigate("/cart")} />
      <User onClick={() => navigate("/profile")} />

    </div>
  );
}

export default MobileNav;