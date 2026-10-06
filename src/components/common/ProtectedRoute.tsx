import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";
import { SixDotsSpinner } from "@/components/icons/Loading";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="absolute w-screen h-screen z-10 inset-0 flex items-center justify-center bg-black/50">
        <SixDotsSpinner width={80} height={80} speed={0.75} stroke="#59d6c6" fill="#59d6c6"/>
      </div>
    );

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
