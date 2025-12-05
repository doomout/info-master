// Member 목록 조회 페이지
import { useEffect, useState } from "react";
import api from "../api/api";
import type { Member } from "../types/Member";
import { Link } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";

export default function MemberListPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    api.get<Member[]>("/api/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <Link to="/members/create">+ Create Member</Link>

      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.name} ({m.email}){" "}
            <Link to={`/members/${m.id}`}>[View]</Link>{" "}
            <Link to={`/members/${m.id}/edit`}>[Edit]</Link>
            <DeleteButton id={m.id} onDelete={() => setMembers(members.filter(x => x.id !== m.id))} />
          </li>
        ))}
      </ul>
    </div>
  );
}
