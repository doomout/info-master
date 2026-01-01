import { Link } from "react-router-dom";
import "./Header.css";
import { isAdmin } from "../config/admin";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-area">
          <h1 className="logo">기술사 공부</h1>

          {isAdmin && (
            <span className="admin-badge">관리자 모드</span>
          )}
        </div>

        <nav className="nav">
          <Link to="/">홈</Link>

          {isAdmin && (
            <>
              <Link to="/admin">관리자 홈</Link>
              <Link to="/questions">문제 보기</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
