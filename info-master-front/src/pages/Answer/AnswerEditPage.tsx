import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnswerApi } from "../../api/AnswerApi";
import { QuestionApi } from "../../api/QuestionApi";

export default function AnswerEditPage() {
  const { id } = useParams(); // 수정할 답안 ID
  const nav = useNavigate();

  const [answer, setAnswer] = useState<any>(null);
  const [question, setQuestion] = useState<any>(null);
  const [text, setText] = useState("");

  // 답안 로딩
  useEffect(() => {
    if (!id) return;

    AnswerApi.get(Number(id))
      .then((res) => {
        setAnswer(res.data);
        setText(res.data.answerText); // 기존 내용 채워넣기

        // 문제 정보도 로드
        return QuestionApi.get(res.data.questionId);
      })
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [id]);

  // 저장
  const save = async () => {
    if (!text.trim()) {
      alert("답안을 입력하세요!");
      return;
    }

    try {
      const body = {
        ...answer,
        answerText: text,
      };

      const res = await AnswerApi.update(answer.id, body);
      alert("답안이 수정되었습니다.");
      nav(`/answers/${res.data.id}`);
    } catch (e) {
      console.error(e);
      alert("수정 중 오류 발생!");
    }
  };

  if (!answer || !question) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 15 }}>✏️ 답안 수정</h2>

      {/* 문제 정보 */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: 15,
          marginBottom: 25,
          background: "#fafafa",
          borderRadius: 8
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
            marginTop: 10,
            fontFamily: "inherit",
            background: "#fff",
            padding: 10,
            borderRadius: 5,
            border: "1px solid #eee"
          }}
        >
          {question.questionText}
        </pre>
      </div>

      {/* 답안 입력 */}
      <h3>📝 답안 내용</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={16}
        style={{
          width: "100%",
          padding: 12,
          border: "1px solid #ccc",
          borderRadius: 6,
          fontSize: 15,
          fontFamily: "Consolas, monospace",
          resize: "vertical",
          marginBottom: 20
        }}
      />

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
      
      <button
        onClick={save}
        style={{
          padding: "10px 18px",
          background: "#007bff",
          color: "white",
          borderRadius: 6,
          border: 0,
        }}
      >
        저장하기
      </button>

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
        목록으로
      </button>
    </div>

    </div>
  );
}
