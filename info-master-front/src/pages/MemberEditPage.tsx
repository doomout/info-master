// Member 수정 페이지 (PUT)
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import type { Member } from "../types/Member";

export default function MemberEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    api.get<Member>(`/api/members/${id}`)
      .then((res) => setMember(res.data))
      .catch(console.error);
  }, [id]);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!member) return;
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    try {
      await api.put(`/api/members/${id}`, member);
      alert("Updated!");
      nav("/members");
    } catch (err) {
      console.error(err);
      alert("Error updating");
    }
  };

  if (!member) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Member</h2>

      <form onSubmit={submit}>
        <div>
          <label>Name:</label>
          <input name="name" value={member.name} onChange={change} />
        </div>

        <div>
          <label>Email:</label>
          <input name="email" value={member.email} onChange={change} />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
