import { Link } from "react-router-dom";
import "./Header.css";

export default function PublicHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-area">
          <h1 className="logo">기술사 공부</h1>
        </div>

        <nav className="nav">
          <Link to="/">홈</Link>
          <Link to="/questions">문제 보기</Link>
        </nav>
      </div>
    </header>
  );
}
