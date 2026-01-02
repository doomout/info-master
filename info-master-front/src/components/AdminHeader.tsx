import { Link } from "react-router-dom";
import "./Header.css";

export default function AdminHeader() {
  return (
    <header className="header admin">
      <div className="header-inner">
        <div className="logo-area">
          <h1 className="logo">기술사 공부</h1>
          <span className="admin-badge">관리자 모드</span>
        </div>

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
