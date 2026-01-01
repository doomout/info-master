import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagApi } from "../../api/TagApi";
import "./AdminTagListPage.css"; // 👈 목록 페이지 CSS 재사용

export default function AdminTagCreatePage() {
  const nav = useNavigate();
  const [name, setName] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await TagApi.create({ name });
    nav("/admin/tags");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2>카테고리 생성</h2>
          <p className="desc">문제 분류에 사용할 카테고리를 추가합니다.</p>
        </div>
      </div>

      <div className="admin-card">
        <form onSubmit={submit}>
          <div className="form-row">
            <label>카테고리 이름</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="예: 네트워크, AI, 운영체제"
            />
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button type="submit" className="btn-primary">
              저장
            </button>

            <button
              type="button"
              className="btn-sm"
              onClick={() => nav("/admin/tags")}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
