import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { TagApi } from "../../api/TagApi";
import type { QuestionCreate } from "../../types/Question";
import type { Tag } from "../../types/Tag";
import "./QuestionForm.css";

interface CreateQuestion {
  year: number | "";
  round: number | "";
  subject: string;
  number: number | "";
  questionText: string;
  tagIds?: number[];
}

const YEARS = Array.from({ length: 10 }, (_, i) => 2025 - i);

export default function QuestionCreatePage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | "">(""); // 최초 선택 안 된 상태 유지
  const nav = useNavigate();

  const [form, setForm] = useState<CreateQuestion>({
    year: "",
    round: "",
    subject: "",
    number: "",
    questionText: "",
  });

  // 태그 불러오기
  useEffect(() => {
    TagApi.getAll()
      .then(res => setTags(res.data))
      .catch(console.error);
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 폼 제출
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: QuestionCreate = {
      year: Number(form.year),
      round: Number(form.round),
      subject: form.subject,
      number: Number(form.number),
      questionText: form.questionText,
      tagIds: selectedTagId ? [selectedTagId] : [],
    };

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
      <h2 className="page-title">기술사 문제 만들기</h2>

      <form onSubmit={submit} className="question-form-card">
        <div className="form-row">
          <label>연도</label>
          <select name="year" value={form.year} onChange={change} required>
            <option value="">연도 선택</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>회차</label>
          <input
            type="number"
            name="round"
            value={form.round}
            onChange={change}
            required
          />
        </div>

        <div className="form-row">
          <label>카테고리</label>
          <select
            value={selectedTagId}
            onChange={(e) => setSelectedTagId(Number(e.target.value))}
            required
          >
            <option value="">카테고리 선택</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>문제 번호</label>
          <input
            type="number"
            name="number"
            value={form.number}
            onChange={change}
            required
          />
        </div>

        <div className="form-row">
          <label>문제</label>
          <textarea
            name="questionText"
            value={form.questionText}
            onChange={change}
            placeholder="문제을 입력하세요"
            rows={6}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">생성</button>
          <button type="button" className="btn-cancel" onClick={() => nav("/questions")}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
