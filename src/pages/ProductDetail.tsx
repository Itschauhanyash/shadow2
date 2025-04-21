
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the product with the matching ID - convert the ID to a number
    const productId = parseInt(id as string);
    console.log("Looking for product with ID:", productId);
    
    const foundProduct = products.find(p => p.id === productId);
    console.log("Found product:", foundProduct);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Set defaults
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <p className="text-2xl font-semibold text-[#9b87f5] mt-2">₹{product.price.toLocaleString('en-IN')}</p>
              
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>
              
              {/* Size Selection */}
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'border-[#9b87f5] bg-[#9b87f5] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#9b87f5]'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Color</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color
                          ? 'border-[#9b87f5] bg-[#9b87f5] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#9b87f5]'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection */}
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
                <div className="mt-2 flex items-center space-x-3">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 border rounded-md text-lg font-medium disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="px-3 py-1 border rounded-md text-lg font-medium disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="mt-8 flex space-x-4">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Link to="/cart">
                  <Button variant="outline" className="px-8 py-6">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
