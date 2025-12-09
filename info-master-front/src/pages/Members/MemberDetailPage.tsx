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
      <h2 className="detail-title">회원 상세 보기</h2>

      <div className="detail-row">
        <span className="label">이름:</span>
        <span>{member.name}</span>
      </div>

      <div className="detail-row">
        <span className="label">이메일:</span>
        <span>{member.email}</span>
      </div>

      <div className="detail-row">
        <span className="label">생성일:</span>
        <span>{member.createdAt}</span>
      </div>
      
      <div className="detail-actions">
        <Link to={`/members/${id}/edit`} className="btn-edit">
          수정
        </Link>
        <button className="btn-delete" onClick={handleDelete}>
          삭제
        </button>
        <button className="btn-back" onClick={() => nav("/members")}>
          목록
        </button>
      </div>
    </div>
  );
}
