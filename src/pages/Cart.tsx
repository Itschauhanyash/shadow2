
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed.",
    });
    clearCart();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="mt-8">
            <div className="flow-root">
              <div className="py-12 flex flex-col items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                <p className="mt-1 text-sm text-gray-500">Add items to your cart to check out</p>
                <Link to="/" className="mt-6">
                  <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={`${item.id}-${item.size}-${item.color}`} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="px-2 py-1 border rounded-md"
                          >
                            -
                          </button>
                          <span className="font-medium">Qty {item.quantity}</span>
                          <button 
                            onClick={() => {
                              if (item.quantity < 10) {
                                updateQuantity(item.id, item.quantity + 1);
                              }
                            }}
                            className="px-2 py-1 border rounded-md"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium text-[#9b87f5] hover:text-[#7E69AB] flex items-center"
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 px-4 py-6 sm:px-6 border-t border-gray-200">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₹{getCartTotal().toLocaleString('en-IN')}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/" className="font-medium text-[#9b87f5] hover:text-[#7E69AB]">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
