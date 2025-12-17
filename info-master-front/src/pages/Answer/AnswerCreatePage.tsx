import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnswerApi } from "../../api/AnswerApi";
import { QuestionApi } from "../../api/QuestionApi";

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
      alert("저장 도중 오류가 발생했습니다.");
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 15 }}>✍️ 답안 작성</h2>

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

      {/* Markdown 사용법 안내 */}
      <div
        style={{
          background: "#f0f7ff",
          padding: 15,
          border: "1px solid #cce0ff",
          borderRadius: 6,
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        <strong>📘 Markdown 간단 사용법</strong>
        <ul style={{ marginTop: 8, paddingLeft: 20, fontSize: 14 }}>
          <li><code># 제목</code> → 큰 제목</li>
          <li><code>## 제목</code> → 중간 제목</li>
          <li><code>**굵게**</code>, <code>*기울임*</code></li>
          <li><code>- 리스트 항목</code></li>
          <li><code>1. 번호 리스트</code></li>
          <li>
            <code>| A | B | C |</code><br />
            <code>|---|---|---|</code><br />
            <code>| 1 | 2 | 3 |</code>
            <br />→ 표 만들기
          </li>
          <li>
            <code>```</code> 코드 작성 <code>```</code> → 코드블럭
          </li>
          <li><code>&gt; 인용문</code> → 인용 스타일</li>
          <li>줄바꿈은 <b>Enter 두 번</b>!</li>
        </ul>
      </div>

      {/* 답안 입력 */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 8 }}>📝 답안 입력 (Markdown 지원)</h3>
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
          }}
        />
      </div>

      {/* 저장 버튼 */}
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
        
        {/* 목록 버튼은 문제 목록 페이지로 이동 */}
        <button
          onClick={() => nav(`/questions/${question.questionId}`)}
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
