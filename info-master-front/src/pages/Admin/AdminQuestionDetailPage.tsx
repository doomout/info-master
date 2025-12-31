import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { QuestionApi } from "../../api/QuestionApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AnswerEditor from "./AnswerEditor";

function MarkdownPreview({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");
          const isBlock = Boolean(match);

          return isBlock? (
            <SyntaxHighlighter
              style={oneDark}
              language={match![1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              style={{
                background: "#f4f4f4",
                padding: "2px 4px",
                borderRadius: 4,
              }}
            >
              {children}
            </code>
          );
        }
      }}
    >
      {content || "_미리보기 내용이 없습니다._"}
    </ReactMarkdown>
  );
}


export default function AminQuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const questionId = Number(id);
  // Answer 는 question 안에 포함되어 있음
  const answer = question?.answer;
  // AnswerEditor 컴포넌트에서 답안을 저장하면 reload 함수를 호출하여 다시 불러옴
  const reload = async () => {
    const res = await QuestionApi.get(questionId);
    setQuestion(res.data);
    setEditing(false);
  };

  // 문제 + 답안 가져오기
  useEffect(() => {
    if (!questionId) return;

    QuestionApi.get(questionId)
      .then((res) => setQuestion(res.data))
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
            <button onClick={() => setEditing(true)}>
              ✍️ 답안 작성하기
            </button>
          ) : (
            <button onClick={() => setEditing(true)}>
              ✏️ 답안 수정하기
            </button>
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

      {/* ===== 답안 편집 영역 ===== */}
      {editing && (
        <AnswerEditor
          questionId={questionId}
          initialValue={answer?.answerText}
          onSaved={reload}
          onCancel={() => setEditing(false)}
        />
      )}

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
          <div id="answer-view" style={{ marginTop: 20 }}>
            <MarkdownPreview content={answer.answerText} />
          </div>
        )
      }
      </div>
    </div>
  );
}
