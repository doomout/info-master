import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QuestionApi, AnswerApi } from "../../api/api";
import type { Question } from "../../types/Question";
import type { Answer } from "../../types/Answer";
import "./QuestionDetailPage.css";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);

  // 1) 문제 상세 불러오기
  useEffect(() => {
    if (!id) return;

    QuestionApi.get(Number(id))
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [id]);

  // 2) 답안 1개만 불러오기
  useEffect(() => {
    if (!question || !question.id) return;

    AnswerApi.listByQuestion(question.id)
      .then((res) => {
        if (res.data.length > 0) {
          setAnswer(res.data[0]);
        }
      })
      .catch(console.error);
  }, [question]);

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
          {/* 답안이 존재하면 → 수정/보기 버튼 */}
          {answer ? (
            <Link to={`/answers/${answer.id}`} className="btn btn-primary">
              📄 답안 보기 / 수정하기
            </Link>
          ) : (
            // 답안이 없으면 → 새로 작성 버튼
            <Link
              to={`/answers/new?questionId=${question.id}`}
              className="btn btn-primary"
            >
              ✍️ 답안 작성하기
            </Link>
          )}

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
