import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/api";
import type { Question } from "../../types/Question";
import "./QuestionForm.css";

export default function QuestionEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState<Question | null>(null);

  // 기존 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    QuestionApi.get(Number(id))
      .then((res) => setForm(res.data))
      .catch(console.error);
  }, [id]);

  // 공통 change 이벤트
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id) return;

    try {
      await QuestionApi.update(Number(id), form);
      alert("문제가 수정되었습니다!");
      nav(`/questions/${id}`);
    } catch (err) {
      console.error(err);
      alert("문제 수정 중 오류 발생");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="question-form-card">
      <h2 className="form-title">문제 수정</h2>

      <form onSubmit={submit} className="question-form">
        <div className="form-row">
          <label>연도</label>
          <input type="number" name="year" value={form.year} onChange={change} required />
        </div>

        <div className="form-row">
          <label>회차</label>
          <input type="number" name="round" value={form.round} onChange={change} required />
        </div>

        <div className="form-row">
          <label>문제 번호</label>
          <input type="number" name="number" value={form.number} onChange={change} required />
        </div>

        <div className="form-row">
          <label>과목명</label>
          <input type="text" name="subject" value={form.subject} onChange={change} required />
        </div>

        <div className="form-row">
          <label>문제 내용</label>
          <textarea
            name="questionText"
            rows={6}
            value={form.questionText}
            onChange={change}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">저장</button>
          <button type="button" className="btn-secondary" onClick={() => nav(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
