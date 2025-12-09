import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/api";
import type { Question } from "../../types/Question";
import "./QuestionForm.css";

interface CreateQuestion {
  year: number | "";
  round: number | "";
  subject: string;
  number: number | "";
  questionText: string;
}

export default function QuestionCreatePage() {
  const nav = useNavigate();

  const [form, setForm] = useState<CreateQuestion>({
    year: "",
    round: "",
    subject: "",
    number: "",
    questionText: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 숫자 변환
    const data: Question = {
      ...form,
      year: Number(form.year),
      round: Number(form.round),
      number: Number(form.number),
    } as Question;

    try {
      await QuestionApi.create(data);
      alert("문제가 생성되었습니다!");
      nav("/questions");
    } catch (err) {
      console.error(err);
      alert("문제 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="question-form-container">
      <h2 className="page-title">Create Question</h2>

      <form onSubmit={submit} className="question-form-card">
        <div className="form-row">
          <label>연도(Year)</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={change}
            required
          />
        </div>

        <div className="form-row">
          <label>회차(Round)</label>
          <input
            type="number"
            name="round"
            value={form.round}
            onChange={change}
            required
          />
        </div>

        <div className="form-row">
          <label>과목(Subject)</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={change}
            placeholder="예: 정보보안, 데이터베이스 등"
            required
          />
        </div>

        <div className="form-row">
          <label>문제 번호(Number)</label>
          <input
            type="number"
            name="number"
            value={form.number}
            onChange={change}
            required
          />
        </div>

        <div className="form-row">
          <label>문제 내용(Question Text)</label>
          <textarea
            name="questionText"
            value={form.questionText}
            onChange={change}
            placeholder="문제 내용을 입력하세요"
            rows={6}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={() => nav("/questions")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
