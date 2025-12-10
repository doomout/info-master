import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnswerApi, QuestionApi } from "../../api/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnswerCreatePage() {
  const nav = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const questionId = Number(params.get("questionId"));

  const [question, setQuestion] = useState<any>(null);
  const [text, setText] = useState("");

  const memberId = 1; // 임시 고정 계정

  // 문제 불러오기
  useEffect(() => {
    if (!questionId) return;
    QuestionApi.get(questionId).then((res) => setQuestion(res.data));
  }, [questionId]);

  const save = async () => {
    if (!text.trim()) {
      alert("답안을 입력하세요!");
      return;
    }

    try {
      const body = {
        questionId,
        memberId,
        answerText: text
      };

      const res = await AnswerApi.create(body);
      alert("답안이 저장되었습니다.");
      nav(`/answers/${res.data.id}`);
    } catch (e) {
      console.error(e);
      alert("저장 도중 오류 발생!");
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>✍️ 답안 작성</h2>

      {/* 문제 정보 표시 */}
      <div style={{ border: "1px solid #ddd", padding: 15, marginBottom: 20 }}>
        <h3>
          {question.subject} — No.{question.number}
        </h3>
        <p style={{ color: "#666" }}>
          {question.year}년 {question.round}회차
        </p>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
          {question.questionText}
        </pre>
      </div>

      {/* Markdown 입력기 */}
      <h3>📝 답안 (Markdown 지원)</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={15}
        style={{
          width: "100%",
          padding: 12,
          border: "1px solid #ccc",
          borderRadius: 4,
          fontFamily: "Consolas, monospace"
        }}
      />

      {/* 미리보기 */}
      <h3 style={{ marginTop: 30 }}>👀 미리보기</h3>
      <div
        style={{
          padding: 15,
          border: "1px solid #ddd",
          borderRadius: 4,
          background: "#fafafa"
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text || "_작성 중입니다…_"}
        </ReactMarkdown>
      </div>

      <button
        onClick={save}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        저장하기
      </button>
    </div>
  );
}
