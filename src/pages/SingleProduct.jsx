import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../api/cart";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartSummary, setCartSummary] = useState({ totalItems: 0, totalPrice: 0 });

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProduct(res.data.product);
    } catch (err) {
      console.error("Product not found:", err);
    }
  };

  fetchProduct();
}, [id]);


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


  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-8 bg-gray-50 min-h-screen">
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}  
        className="w-full md:w-1/2 rounded-lg shadow"
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.desc}</p>
        <p className="text-2xl font-semibold text-blue-700">₹{product.price}</p>

        <div className="flex gap-4 mt-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}>Add to Cart</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Buy Now</button>
        </div>
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

export default SingleProduct;
