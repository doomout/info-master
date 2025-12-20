import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { TagApi } from "../../api/TagApi";
import type { Tag } from "../../types/Tag";
import "./QuestionForm.css";

const YEARS = Array.from({ length: 10 }, (_, i) => 2025 - i);

// 수정 폼 인터페이스
interface QuestionEditForm {
  exam_year: number | "";
  round: number | "";
  number: number | "";
  questionText: string;
  tagId: number | "";
}

export default function QuestionEditPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const { id } = useParams();
  const nav = useNavigate();
  const [selectedTagId, setSelectedTagId] = useState<number | "">(""); // 최초 선택 안 된 상태 유지

  // 폼 상태
  const [form, setForm] = useState<QuestionEditForm | null>(null);

  // 태그 불러오기
  useEffect(() => {
    TagApi.getAll()
      .then(res => setTags(res.data))
      .catch(console.error);
  }, []);
  
  // 기존 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    QuestionApi.get(Number(id))
      .then(res => {
        const q = res.data;
      setForm({
        exam_year: q.exam_year,
        round: q.round,
        number: q.number,
        questionText: q.questionText,
        tagId: q.tagId,
      });

      setSelectedTagId(q.tagId);
    })
    .catch(console.error);
  }, [id]);

  // 공통 change 이벤트
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!form) return;

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 제출 이벤트
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id || !form.tagId) return;

    const data = {
      exam_year: Number(form.exam_year),
      round: Number(form.round),
      number: Number(form.number),
      questionText: form.questionText,
      tagId: Number(form.tagId),
    };

    try {
      await QuestionApi.update(Number(id), data);
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
          <select name="exam_year" value={form.exam_year} onChange={change} required>
            <option value="">연도 선택</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>회차</label>
          <input type="number" name="round" value={form.round} onChange={change} required />
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
          <input type="number" name="number" value={form.number} onChange={change} required />
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

        <div className="form-actions">
          <button type="submit" className="btn-primary">저장</button>

          <button type="button" className="btn-cancel" onClick={() => nav("/questions")}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
