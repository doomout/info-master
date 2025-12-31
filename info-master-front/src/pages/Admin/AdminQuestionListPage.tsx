import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import type { Question } from "../../types/Question";
import "./QuestionListPage.css";

export default function AdminQuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    QuestionApi.list()
      .then(({ data }) => setQuestions(data))
      .catch(console.error);
  }, []);

  // 관리자 전용 삭제
  const deleteQuestion = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await QuestionApi.delete(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      alert("삭제되었습니다.");
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="questions-container">
      {/* 헤더 */}
      <div className="questions-header">
        <h2>문제 관리</h2>

        <Link to="/admin/questions/create" className="btn-create">
          + 문제 생성
        </Link>
      </div>

      {/* 리스트 */}
      <div className="questions-grid">
        {questions.map((q) => (
          <div className="question-card admin" key={q.id}>
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

            {/* 관리자 액션 */}
            <div className="question-actions">
              <Link
                to={`/questions/${q.id}`}
                className="btn-view"
                target="_blank"
              >
                사용자 화면 보기
              </Link>

              <Link
                to={`/admin/questions/${q.id}/edit`}
                className="btn-edit"
              >
                수정
              </Link>

              <button
                className="btn-delete"
                onClick={() => deleteQuestion(q.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
