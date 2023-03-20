import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.isAdmin;
  return isAdmin ? <Outlet /> : <Navigate to="/registro" />;
};

export default AdminRoute;
