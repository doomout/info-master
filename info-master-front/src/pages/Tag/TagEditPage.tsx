import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TagApi } from "../../api/api";
import type { Tag } from "../../types/Tag";

export default function TagEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState<Tag | null>(null);

  useEffect(() => {
    if (!id) return;
    TagApi.get(Number(id)).then((res) => setForm(res.data));
  }, [id]);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    TagApi.update(form.id, { name: form.name }).then(() => nav("/tags"));
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h2>태그 수정</h2>

      <form onSubmit={submit}>
        <input
          name="name"
          value={form.name}
          onChange={change}
          required
        />

        <button type="submit">저장</button>
      </form>
    </div>
  );
}
