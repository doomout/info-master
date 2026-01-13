import { Link, useNavigate } from "react-router-dom";
import { AdminApi } from "../api/AdminApi";
import "./Header.css";

export default function AdminHeader() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;

    try {
      await AdminApi.logout();

      navigate("/admin/login", { replace: true });
    } catch (e) {
      console.error(e);
      alert("로그아웃 실패");
    }
  };

  return (
    <header className="header admin">
      <div className="header-inner">
        <div className="logo-area">
          <h1 className="logo">기술사 공부</h1>
          <span className="admin-badge">관리자 모드</span>
        </div>

        {/* 🔥 로그아웃 */}
        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          로그아웃
        </button>

        <nav className="nav">
          <Link to="/admin">대시보드</Link>
          <Link to="/admin/questions">문제 관리</Link>
          <Link to="/admin/tags">카테고리 관리</Link>
          <Link to="/">사용자 화면</Link>
        </nav>
      </div>
    </header>
  );
}
