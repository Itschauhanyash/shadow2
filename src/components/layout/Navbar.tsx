
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { getCartQuantity } = useCart();
  const cartQuantity = getCartQuantity();
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#9b87f5]">Yash Shophy</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#9b87f5]">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-[#9b87f5]">
              Products
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#9b87f5]">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#9b87f5] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Link>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
