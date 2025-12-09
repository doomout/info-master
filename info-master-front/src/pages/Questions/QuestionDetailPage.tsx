import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QuestionApi } from "../../api/api";
import type { Question } from "../../types/Question";
import "./QuestionDetailPage.css";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (!id) return;
    QuestionApi.get(Number(id))
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await QuestionApi.remove(Number(id));
    nav("/questions");
  };

  if (!question) return <div className="loading">Loading...</div>;

  return (
    <div className="question-detail-container">
      <div className="question-card">
        <h1 className="question-title">
          {question.subject} - No.{question.number}
        </h1>

        <div className="question-meta">
          <span>{question.year}년</span>
          <span>{question.round}회차</span>
          {question.difficulty && <span>난이도: {question.difficulty}</span>}
        </div>

        <p className="question-text">{question.questionText}</p>

        <div className="question-actions">
          <Link to={`/questions/${question.id}/edit`} className="btn-edit">
            수정
          </Link>
          <button onClick={handleDelete} className="btn-delete">
            삭제
          </button>
          <Link to="/questions" className="btn-back">
            목록
          </Link>
        </div>
      </div>
    </div>
  );
}
