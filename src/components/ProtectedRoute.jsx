import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to={`/auth/vendor`} replace />;
  }

  // auth required

  if (!allowedRoles.includes(auth.user.role)) {
    if (auth.user.role === "vendor" || auth.user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else if (auth.user.role === "customer") {
      return <Navigate to="/shop" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Allowed access
  return children;
};

export default ProtectedRoute;
