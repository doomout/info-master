import { Outlet } from "react-router-dom";
import PublicHeader from "../PublicHeader";

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main style={{ padding: "20px 0" }}>
        <Outlet />
      </main>
    </>
  );
}
