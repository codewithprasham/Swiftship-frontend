import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AuthPage from "./pages/Authpage";
import RoleSelection from "./pages/RoleSelection";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/Cart";
import CategoryMaster from "./pages/CategoryMaster";


const AppLayout = ({ children, toggleSidebar, isSidebarOpen }) => (
  <div className="flex h-screen">
    {isSidebarOpen && <Sidebar />}
    <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100">
      <Topbar toggleSidebar={toggleSidebar} />
      <main className="p-6">{children}</main>
    </div>
  </div>
);

const AppRoutes = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const publicRoutes = ["/", "/auth/customer", "/auth/vendor"];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/auth/:role" element={<AuthPage />} />
      <Route path="/auth/:role/register" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["vendor", "admin"]}>
            <AppLayout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            >
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRoles={["vendor", "admin"]}>
            <AppLayout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            >
              <Products />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/category-master"
        element={
          <ProtectedRoute allowedRoles={["vendor", "admin"]}>
            <AppLayout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            >
              <CategoryMaster />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/shop"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <AppLayout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            >
              <Shop />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/shop/:id"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <AppLayout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            >
              <SingleProduct />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <AppLayout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            >
              <CartPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>


  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <AuthProvider>
        <Router>
          <AppRoutes
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </Router>
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </>
  );
};

export default App;
