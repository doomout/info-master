import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagApi } from "../../api/api";

export default function TagCreatePage() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    TagApi.create(form).then(() => nav("/tags"));
  };

  return (
    <div>
      <h2>태그 생성</h2>

      <form onSubmit={submit}>
        <input
          name="name"
          value={form.name}
          onChange={change}
          placeholder="태그 이름"
          required
        />

        <button type="submit">저장</button>
      </form>
    </div>
  );
}
