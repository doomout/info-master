import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import type { Question } from "../../types/Question";
import "../Questions/QuestionListPage.css";

export default function PublicQuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  // 문제 로딩 상태 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    QuestionApi.list()
      .then(({ data }) => {
        if (!cancelled) setQuestions(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
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
        {/* 렌더링 분기 */}
        {loading && (
          <div className="loading">
            📡 문제 불러오는 중입니다...
          </div>
        )}

        {!loading && questions.length === 0 && (
          <div className="empty">
            아직 등록된 문제가 없습니다.
          </div>
        )}

        {!loading && questions.map((q) => (
          <div
            key={q.id}
            className="question-card public"
            onClick={() => navigate(`/questions/${q.id}`)}
          >
            <div className="question-header">
              <span className="question-year">
                {q.examYear}년 / {q.round}회차
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
