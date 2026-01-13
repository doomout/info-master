import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminApi } from "../api/AdminApi";

export default function AdminRoute() {
  //console.log("🔥 AdminRouteGuard rendered");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    //console.log("🔥 before axios");
    AdminApi.me()
      .then(() => {
        //console.log("✅ me success");
        setAuthenticated(true)
      })
      .catch(() => {
        //console.log("❌ me error");
        setAuthenticated(false)
      })
      .finally(() => {
        //console.log("🔚 finally");
        setLoading(false)
      });
  }, [location.pathname]);

  if (loading) return <div>확인 중...</div>;

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
