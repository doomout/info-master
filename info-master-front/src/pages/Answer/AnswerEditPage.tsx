import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnswerApi } from "../../api/AnswerApi";
import { QuestionApi } from "../../api/QuestionApi";

import MarkdownEditor from "../../components/markdown/MarkdownEditor";

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
       {/* 상단 한 줄 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}
          >
          {/* 왼쪽: 문제 번호 + 연도/회차 */}
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            문제 번호 : {question.number} 번
            <span style={{ marginLeft: 10, color: "#666", fontWeight: 400 }}>
              ({question.exam_year}년 {question.round}회차)
            </span>
          </div>
          
          {/* 오른쪽: 태그 */}
          <div
            style={{
              padding: "4px 10px",
              background: "#e9f2ff",
              color: "#0056b3",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 500
            }}
          >
            {question.tagName ?? "미분류"}
          </div>
        </div>
        {/* 문제 본문 */}
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
      
      {/* 마크다운 에디터 */}
      <MarkdownEditor value={text} onChange={setText} />

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
          onClick={() => nav(`/questions/${answer.questionId}`)}
          style={{
            padding: "10px 18px",
            background: "#444",
            color: "white",
            borderRadius: 6,
            border: 0,
          }}
        >
          문제로 돌아가기
        </button>
      </div>
    </div>
  );
}
