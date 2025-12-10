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
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 1) 문제 상세 가져오기
  useEffect(() => {
    if (!id) return;

    QuestionApi.get(Number(id))
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [id]);

  // 2) 해당 문제에 대한 답안 목록 가져오기
  useEffect(() => {
    if (!id) return;

    AnswerApi.listByQuestion(Number(id))
      .then((res) => setAnswers(res.data))
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
          <Link
            to={`/answers/new?questionId=${question.id}`}
            className="btn btn-primary"
          >
            ✍️ 답안 작성하기
          </Link>

          <Link to={`/questions/${question.id}/edit`} className="btn-edit">
            수정
          </Link>

          <button onClick={handleDelete} className="btn-delete">
            삭제
          </button>

          <Link to="/questions" className="btn-back">
            목록
          </Link>

          {/* 3) 답안 목록 출력 */}
          <h3 style={{ marginTop: 30 }}>작성된 답안</h3>
          <ul>
            {answers.length === 0 && <li>아직 작성된 답안이 없습니다.</li>}

            {answers.map((a) => (
              <li key={a.id}>
                <Link to={`/answers/${a.id}`}>
                  {a.createdAt?.substring(0, 10)} 작성한 답안 보기
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
