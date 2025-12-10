import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagApi } from "../../api/api";
import "./tag.css";

export default function TagCreatePage() {
  const nav = useNavigate();
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    TagApi.create({ name }).then(() => nav("/tags"));
  };

  return (
    <div className="tag-page">
      <div className="page-title">새 태그 생성</div>

      <form onSubmit={submit}>
        <div className="form-group">
          <label>태그 이름</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </form>
    </div>
  );
}
