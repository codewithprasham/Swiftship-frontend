  import { LayoutDashboard, Package } from "lucide-react";
  import { Link, useLocation } from "react-router-dom";
  import { useAuth } from "../contexts/AuthContext";
  import logo from "../assets/swiftship-logo.png"; 


  const Sidebar = () => {
    const location = useLocation();
    const { auth } = useAuth();

    const role = auth?.user?.role;

    
    const navLinks = [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        path: "/dashboard",
        roles: ["vendor", "admin"], 
      },
      {
        name: "Products",
        icon: <Package size={18} />,
        path: "/products",
        roles: ["vendor", "admin"], 
      },
      {
        name: "Shop",
        icon: <Package size={18} />,
        path: "/shop",
        roles: ["customer"], 
      },
      {
        name: "Category Master",
        icon: <Package size={18} />,
        path: "/category-master",
        roles: ["vendor", "admin"], 
      },
    ];

    return (
      <aside className="bg-[#0b1120] text-white w-64 h-screen p-6 flex flex-col shadow-lg transition-all duration-300 rounded-tr-2xl rounded-br-2xl">
        {/* <h1 className="text-2xl font-bold tracking-wide mb-8">SwiftShip</h1> */}
        <div className="flex items-center gap-3 mb-8">
  <img src={logo} alt="Swift Ship" className="h-30 w-30 object-contain margin-0"/>
 
</div>
        <nav className="flex flex-col gap-1">
          {navLinks
            .filter((link) => link.roles.includes(role)) 
            .map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-[#0b1120] border-l-4 border-white text-white font-semibold"
                      : "hover:bg-blue-300 text-gray-300 hover:text-[#0b1120]"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
        </nav>
      </aside>
    );
  };

  export default Sidebar;
