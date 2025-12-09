import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">기술사 공부</h1>

        <nav className="nav">
          <Link to="/">홈</Link>
          <Link to="/members">회원 관리</Link>
          <Link to="/questions">문제 관리</Link>
        </nav>
      </div>
    </header>
  );
}
