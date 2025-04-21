
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yash Shophy</h3>
            <p className="text-gray-600">
              Your one-stop destination for trendy fashion at affordable prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-[#9b87f5]">Home</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-[#9b87f5]">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600">Email: info@yashshophy.com</p>
            <p className="text-gray-600">Phone: +91 1234567890</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Yash Shophy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
