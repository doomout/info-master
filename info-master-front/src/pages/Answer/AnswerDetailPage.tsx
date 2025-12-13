import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AnswerApi, QuestionApi } from "../../api/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnswerDetailPage() {
  const { id } = useParams();
  const [answer, setAnswer] = useState<any>(null);
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    AnswerApi.get(Number(id))
      .then((res) => {
        setAnswer(res.data);
        return QuestionApi.get(res.data.questionId);
      })
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [id]);

  if (!answer || !question) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 20 }}>📄 답안 보기</h2>

      {/* 문제 정보 */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: 15,
          background: "#fafafa",
          borderRadius: 8,
          marginBottom: 25,
        }}
      >
        <h3>
          {question.subject} — No.{question.number}
        </h3>

        <p style={{ color: "#666", fontSize: 14 }}>
          {question.year}년 {question.round}회차
        </p>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#fff",
            padding: 10,
            borderRadius: 5,
            border: "1px solid #eee",
            marginTop: 10,
            fontFamily: "inherit",
          }}
        >
          {question.questionText}
        </pre>
      </div>

      {/* 답안 본문 */}
      <div
        style={{
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
          background: "#fff",
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {answer.answerText}
        </ReactMarkdown>
      </div>

      {/* 수정 버튼 */}
      <div style={{ marginTop: 20 }}>
        <Link
          to={`/answers/${answer.id}/edit`}
          style={{
            padding: "10px 16px",
            background: "#007bff",
            color: "white",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          수정하기
        </Link>
      </div>
    </div>
  );
}
