import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AdminApi } from "../api/AdminApi";

// 관리자 전용 라우트 컴포넌트
// 인증 여부를 확인하고, 인증되지 않은 경우 로그인 페이지로 리다이렉트합니다.
// 200 -> 인증 O, 401 -> 인증 X
// 로그인 안돼 있으면 /admin/login 으로 보냄
export default function AdminRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    AdminApi.me()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>확인 중...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
