import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">InfoMaster</h1>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/members">Members</Link>
          <Link to="/questions">Questions</Link>
        </nav>
      </div>
    </header>
  );
}
