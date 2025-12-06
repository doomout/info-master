//Member 상세 조회 페이지 (GET)

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";
import type { Member } from "../../types/Member";

export default function MemberDetailPage() {
  const { id } = useParams();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    api.get<Member>(`/api/members/${id}`)
      .then((res) => setMember(res.data))
      .catch(console.error);
  }, [id]);

  if (!member) return <p>Loading...</p>;

  return (
    <div>
      <h2>Member Detail</h2>
      <p>ID: {member.id}</p>
      <p>Name: {member.name}</p>
      <p>Email: {member.email}</p>

      <Link to={`/members/${member.id}/edit`}>Edit</Link>
      <br />
      <Link to="/members">Back</Link>
    </div>
  );
}
