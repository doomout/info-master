import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/members">Members</Link> |{" "}
      <Link to="/members/create">Create Member</Link>
    </nav>
  );
}
