import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminApi } from "../api/AdminApi";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    AdminApi.me()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>확인 중...</div>;

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
