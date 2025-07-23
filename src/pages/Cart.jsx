import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/cart";
import { placeOrder } from "../api/orders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      toast.error("Unable to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await removeFromCart(cartId);
      fetchCart();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/uploads/${item.Product.image}`}
                  alt={item.Product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.Product.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.Product.price} x {item.quantity} = ₹
                    {item.Product.price * item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>
            <button
              onClick={handlePlaceOrder}
              className="bg-indigo-700 text-white px-6 py-2 rounded hover:bg-indigo-800"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
