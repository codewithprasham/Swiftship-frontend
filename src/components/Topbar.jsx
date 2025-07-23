import { useLocation } from "react-router-dom";
import { Bell, Menu, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const getTitle = (path) => {
    const routeMap = {
      "/dashboard": "Dashboard",
      "/products": "Products",
      "/shop": "Shop",
      "/cart": "My Cart",
    };
    return routeMap[path] || "Page";
  };

  const title = getTitle(location.pathname);

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            2
          </span>
        </button>

        {auth?.user?.role === "customer" && (
          <Link
            to="/cart"
            className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            <ShoppingCart size={16} />
            Cart
          </Link>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden md:block capitalize">
            Hello, {auth?.user?.role}
          </span>

          <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-100 transition"
          >
            Logout
          </button>

          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full border hover:scale-105 transition-transform duration-150"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
