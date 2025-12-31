import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TagApi } from "../../api/TagApi";
import type { Tag } from "../../types/Tag";
import "./tag.css";

export default function AminTagEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState<Tag | null>(null);

  useEffect(() => {
    if (!id) return;
    TagApi.get(Number(id)).then(res => setForm(res.data));
  }, [id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    TagApi.update(form.id, { name: form.name }).then(() => nav("/admin/tags"));
  };

  if (!form) return <div className="tag-page">로딩 중...</div>;

  return (
    <div className="tag-page">
      <div className="page-title">태그 수정</div>

      <form onSubmit={submit}>
        <div className="form-group">
          <label>태그 이름</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
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
