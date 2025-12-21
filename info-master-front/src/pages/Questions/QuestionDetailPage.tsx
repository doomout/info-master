import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { AnswerApi } from "../../api/AnswerApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [question, setQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState<any>(null);
  const questionId = Number(id);

  // 문제 + 답안 가져오기
  useEffect(() => {
    if (!questionId) return;

    QuestionApi.get(questionId).then((res) => setQuestion(res.data));

    AnswerApi.listByQuestion(questionId)
      .then((res) => {
        setAnswer(res.data ?? null);
      })
      .catch(console.error);
  }, [questionId]);

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 10,
          background: "white",
          marginBottom: 30,
        }}
      >
        <h2>
          {question.subject} 문제 No.{question.number}
        </h2>

        <p style={{ color: "#666", marginBottom: 10 }}>
          {question.exam_year}년 {question.round}회차 &nbsp;|&nbsp; 카테고리: {question.tagName}
        </p>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#fafafa",
            padding: 15,
            borderRadius: 6,
            border: "1px solid #eee",
          }}
        >
          {question.questionText}
        </pre>

        {/* 버튼 영역 */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          {!answer ? (
            <button
              onClick={() => nav(`/answers/new?questionId=${questionId}`)}
              style={{
                padding: "10px 16px",
                background: "#007bff",
                color: "white",
                borderRadius: 6,
                border: 0,
                cursor: "pointer",
              }}
            >
              ✍️ 답안 작성하기
            </button>
          ) : (
            <>
              <button
                onClick={() => nav(`/answers/${answer.id}/edit`)}
                style={{
                  padding: "10px 16px",
                  background: "#007bff",
                  color: "white",
                  borderRadius: 6,
                  border: 0,
                  cursor: "pointer",
                }}
              >
                ✏️ 답안 수정하기
              </button>
            </>
          )}

          <Link
            to="/questions"
            style={{
              padding: "10px 16px",
              background: "#444",
              color: "white",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            문제 목록
          </Link>
        </div>
      </div>

      {/* ===== 답안 표시 영역 ===== */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 10,
          background: "white",
        }}
      >
        <h3>📘 작성된 답안</h3>

        {!answer ? (
          <p style={{ color: "#888", padding: 20 }}>아직 답안이 없습니다.</p>
        ) : (
          <div style={{ marginTop: 20 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {answer.answerText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
