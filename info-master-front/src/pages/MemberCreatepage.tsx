// Member 생성 페이지 (POST)

import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function MemberCreatePage() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/members", form);
      alert("Created!");
      nav("/members");
    } catch (err) {
      console.error(err);
      alert("Error creating member");
    }
  };

  return (
    <div>
      <h2>Create Member</h2>

      <form onSubmit={submit}>
        <div>
          <label>Name:</label>
          <input name="name" value={form.name} onChange={change} />
        </div>

        <div>
          <label>Email:</label>
          <input name="email" value={form.email} onChange={change} />
        </div>

        <div>
          <label>Password:</label>
          <input name="password" type="password" value={form.password} onChange={change} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
