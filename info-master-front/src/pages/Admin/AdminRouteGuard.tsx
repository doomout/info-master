import { Outlet } from "react-router-dom";

export default function AdminRouteGuard() {
  // TODO: 나중에 인증 로직 추가
  return <Outlet />;
}
