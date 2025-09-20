import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/UI/Spinner.jsx";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading,isInitialized, user } = useSelector((state) => state.auth);

  // console.log('RoleBasedRoute state:', { isAuthenticated, user, loading });

  // Wait till all the states are reinitialized
  if (!isInitialized || loading) {
    return <Spinner fullScreen text="Loading..." size="2xl" />
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    console.log("Navigation to login .IS authenticated :",isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {
    // console.log("Navigation to login");
    console.log("Navigation to login .Role :",user.role);
    return <Navigate to="/login" replace />;
  }

  // If the user is Authorized
  return children;
};

export default ProtectedRoute;
