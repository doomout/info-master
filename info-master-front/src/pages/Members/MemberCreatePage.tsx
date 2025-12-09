import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MemberApi from "../../api/MemberApi";
import type { CreateMember } from "../../types/Member";
import "./MemberForm.css";

export default function MemberCreatePage() {
  const nav = useNavigate();

  const [form, setForm] = useState<CreateMember>({
    name: "",
    email: "",
    password: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await MemberApi.create(form);
      toast.success("멤버가 생성되었습니다!");
      nav("/members");
    } catch (err) {
      console.error(err);
      toast.error("멤버 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">회원 가입</h2>

      <form onSubmit={submit} className="form-layout">
        <div className="form-field">
          <label>이름</label>
          <input name="name" value={form.name} onChange={change} required />
        </div>
    
        <div className="form-field">
          <label>이메일</label>
          <input name="email" value={form.email} onChange={change} required />
        </div>

        <div className="form-field">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            required
          />
        </div>

        <button className="btn-primary">가입</button>
      </form>
    </div>
  );
}
