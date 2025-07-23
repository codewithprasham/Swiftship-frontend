import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/cart";
import { toast } from "react-toastify";
import { getAllProducts } from "../api/products";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({ totalItems: 0, totalPrice: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      const flatProducts = Array.isArray(res.data.products)
        ? res.data.products.flat()
        : [];

      setProducts(flatProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

   const handleAddToCart = async (product) => {
    try {
      await addToCart(product.product_id);
      toast.success(`${product.product_name} added to cart`);

      setCartSummary((prev) => ({
        totalItems: prev.totalItems + 1,
        totalPrice: prev.totalPrice + product.price,
      }));
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-32">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Explore Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
  key={product.product_id}
  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
  onClick={() => navigate(`/shop/${product.product_id}`)}
>
  <div className="relative group">
    <img
      src={`http://localhost:5000/uploads/${product.image}`}
      alt={product.product_name}
      className="w-full h-56 object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all" />
  </div>

  <div className="p-4 flex flex-col h-full">
    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
      {product.product_name}
    </h2>

    <p className="text-sm text-gray-500 mb-1">
      {product.category_name} &rarr; {product.subcategory_name}
    </p>

    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
      {product.product_description}
    </p>

    <div className="text-lg font-bold text-blue-700 mb-2">
      ₹{product.price}
    </div>

    <div className="mt-auto flex gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click from triggering
          handleAddToCart(product);
        }}
        className="w-1/2 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
      >
        Add to Cart
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click from triggering
          navigate(`/shop/${product.product_id}`);
        }}
        className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
      >
        Buy Now
      </button>
    </div>
  </div>
</div>
        ))}
      </div>

      {cartSummary.totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-800 text-white p-4 shadow-lg z-50 flex items-center justify-between px-6">
          <div>
            <p className="text-sm">🛒 {cartSummary.totalItems} item(s)</p>
            <p className="text-lg font-semibold">Total: ₹{cartSummary.totalPrice}</p>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-indigo-800 font-semibold px-5 py-2 rounded hover:bg-gray-100"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
