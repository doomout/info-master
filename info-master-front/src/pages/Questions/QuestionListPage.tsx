import { useEffect, useState } from "react";
import { QuestionApi } from "../../api/QuestionApi";
import type { Question } from "../../types/Question";
import "./QuestionListPage.css";
import { Link, useNavigate } from "react-router-dom";

export default function QuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    QuestionApi.list()
      .then(({ data }) => setQuestions(data))
      .catch(console.error);
  }, []);

  // 삭제
  const deleteQuestion = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await QuestionApi.delete(id);

      // 상태에서 즉시 제거
      setQuestions((prev) => prev.filter((q) => q.id !== id));

      alert("삭제되었습니다.");
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류 발생!");
    }
  };

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h2>문제</h2>

        {/* 관리자 전용 */}
        <Link to="/questions/create" className="btn-create">
          + 문제 생성
        </Link>
      </div>

      <div className="questions-grid">
        {questions.map((q) => (
          <div className="question-card" 
              key={q.id} 
              onClick={() => navigate(`/questions/${q.id}`)}
          >
            <div className="question-header">
              <span className="question-year">
                {q.exam_year}년 / {q.round}회차
              </span>
              <span className="question-type">{q.tagName}</span>
            </div>

            <div className="question-body">
              <h3 className="question-number">#{q.number}.</h3>
              <p className="question-text">{q.questionText}</p>
            </div>

            <div className="question-actions">
              <Link to={`/questions/${q.id}`} className="btn-view">
                상세보기
              </Link>

              <Link to={`/questions/${q.id}/edit`} 
                className="btn-edit" 
                onClick={(e) => e.stopPropagation()}
              >
                수정
              </Link>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(q.id);
                }}
                style={{
                  padding: "10px 18px",
                  background: "#dc3545",
                  color: "white",
                  borderRadius: 6,
                  border: 0,
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
