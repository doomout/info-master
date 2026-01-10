import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader";

export default function AdminLayout() {

  return (
    <>
      <AdminHeader />
      <main style={{ padding: "20px 0" }}>
        <Outlet />
      </main>
    </>
  );
}
