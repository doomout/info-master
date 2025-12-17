import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnswerApi } from "../../api/AnswerApi";
import { QuestionApi } from "../../api/QuestionApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnswerDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [answer, setAnswer] = useState<any>(null);
  const [question, setQuestion] = useState<any>(null);

  // 답안 상세 화면은 읽기 전용이고, 삭제, 목록 기능만 제공
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

  // ============================
  // 삭제(handleDelete)
  // ============================
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await AnswerApi.delete(answer.id);
      alert("삭제되었습니다.");
      nav(`/questions/${answer.questionId}`); // 문제 상세로 이동
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류 발생!");
    }
  };

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

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <h3>📝 답안 내용</h3>
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

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>

        {/* 수정 버튼은 읽기 전용이므로 수정 페이지로 이동 */}
        <button
          onClick={() => nav(`/answers/${answer.id}/edit`)}
          style={{
            padding: "10px 18px",
            background: "#007bff",
            color: "white",
            borderRadius: 6,
            border: 0,
          }}
        >
          수정하기
        </button>

        {/* 삭제 버튼은 삭제 가능 */}
        <button
          onClick={handleDelete}
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
        
        {/* 목록 버튼은 답안 목록 페이지로 이동 */}
        <button
          onClick={() => nav(`/questions/${answer.questionId}`)}
          style={{
            padding: "10px 18px",
            background: "#444",
            color: "white",
            borderRadius: 6,
            border: 0,
          }}
        >
          답안 상세로
        </button>
    </div>    
  </div>
  );
}
