import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MemberApi from "../../api/MemberApi";
import type { Member } from "../../types/Member";
import "./MemberForm.css"; // Create와 Edit 공통 CSS 사용

export default function MemberEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState<Member | null>(null);

  // 기존 데이터 로딩
  useEffect(() => {
    if (!id) return;

    MemberApi.get(Number(id))
      .then((res) => setForm(res.data))
      .catch(() => toast.error("멤버 정보를 불러오지 못했습니다."));
  }, [id]);

  // 입력 변경
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // 수정 요청
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id) return;

    try {
      await MemberApi.update(Number(id), form);
      toast.success("멤버가 수정되었습니다!");
      nav("/members");
    } catch (err) {
      console.error(err);
      toast.error("멤버 수정 중 오류가 발생했습니다.");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="form-card">
      <h2 className="form-title">Edit Member</h2>

      <form onSubmit={submit} className="form-layout">
        {/* Name */}
        <div className="form-field">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={change}
            required
          />
        </div>

        {/* Email */}
        <div className="form-field">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={change}
            required
          />
        </div>

        {/* Password */}
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
