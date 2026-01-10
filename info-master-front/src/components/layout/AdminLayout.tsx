import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminHeader from "../AdminHeader";
import { AdminApi } from "../../api/AdminApi";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    AdminApi.me()
      .catch(() => {
        // 로그인 안 되어 있으면 로그인 페이지로 튕김
        navigate("/admin/login", { replace: true });
      });
  }, []);

  return (
    <>
      <AdminHeader />
      <main style={{ padding: "20px 0" }}>
        <Outlet />
      </main>
    </>
  );
}
