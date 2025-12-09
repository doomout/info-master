import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MemberApi from "../../api/MemberApi";
import type { Member } from "../../types/Member";
import "./MemberDetailPage.css";

export default function MemberDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    if (!id) return;

    MemberApi.get(Number(id))
      .then((res) => setMember(res.data))
      .catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    await MemberApi.remove(Number(id));
    nav("/members");
  };

  if (!member) return <p>Loading...</p>;

  return (
    <div className="detail-card">
      <h2 className="detail-title">Member Detail</h2>

      <div className="detail-row">
        <span className="label">Name:</span>
        <span>{member.name}</span>
      </div>

      <div className="detail-row">
        <span className="label">Email:</span>
        <span>{member.email}</span>
      </div>

      <div className="detail-row">
        <span className="label">Created At:</span>
        <span>{member.createdAt}</span>
      </div>

      <div className="detail-row">
        <span className="label">Updated At:</span>
        <span>{member.updatedAt}</span>
      </div>

      <div className="detail-actions">
        <Link to={`/members/${id}/edit`} className="btn-edit">
          Edit
        </Link>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn-back" onClick={() => nav("/members")}>
          Back
        </button>
      </div>
    </div>
  );
}
