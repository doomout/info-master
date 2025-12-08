import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberApi from "../../api/MemberApi";
import type { CreateMember } from "../../types/Member";
import { toast } from "react-toastify";
import "./MemberCreatePage.css";

export default function MemberCreatePage() {
  const nav = useNavigate();

  const [form, setForm] = useState<CreateMember>({
    name: "",
    email: "",
    password: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }

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
    <div className="member-form-container">
      <h2>멤버 생성</h2>

      <form onSubmit={submit} className="member-form">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="이름 입력"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={change}
            placeholder="이메일 입력"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            placeholder="비밀번호 입력"
          />
        </label>

        <button type="submit" className="btn-primary">
          Create Member
        </button>
      </form>
    </div>
  );
}
