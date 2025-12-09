import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MemberApi from "../../api/MemberApi";  
import type { Member } from "../../types/Member";
import "./MemberListPage.css";

export default function MemberListPage() {
  const [members, setMembers] = useState<Member[]>([]);

  // 목록 조회
  useEffect(() => {
    MemberApi.list()
      .then((res) => setMembers(res.data))
      .catch(console.error);
  }, []);

  // 삭제 기능
  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    await MemberApi.remove(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="member-container">
      <div className="member-header">
        <h2 className="member-title">회원목록</h2>

        <Link to="/members/create" className="btn-primary">
          + 회원등록
        </Link>
      </div>

      <ul className="member-list">
        {members.map((m) => (
          <li key={m.id} className="member-item">
            <div className="member-info">
              {m.name} ({m.email})
            </div>

            <div className="member-actions">
              <Link to={`/members/${m.id}`} className="btn-view">상세보기</Link>
              <Link to={`/members/${m.id}/edit`} className="btn-edit">수정</Link>
              <button className="btn-delete" onClick={() => handleDelete(m.id)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
