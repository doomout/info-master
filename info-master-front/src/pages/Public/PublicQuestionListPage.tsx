import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import type { Question } from "../../types/Question";
import "../Questions/QuestionListPage.css";

export default function PublicQuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    QuestionApi.list()
      .then(({ data }) => setQuestions(data))
      .catch(console.error);
  }, []);

  return (
    <div className="questions-container">
      {/* 헤더 */}
      <div className="questions-header">
        <h2>문제 목록</h2>
        <p className="questions-desc">
          기술사 시험 대비를 위한 문제 정리 자료입니다.
        </p>
      </div>

      {/* 리스트 */}
      <div className="questions-grid">
        {questions.map((q) => (
          <div
            key={q.id}
            className="question-card public"
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

            {/* 액션 (보기만) */}
            <div className="question-actions">
              <span className="btn-view-only">자세히 보기</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
