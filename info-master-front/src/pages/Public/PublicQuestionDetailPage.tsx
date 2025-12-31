import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MarkdownPreview({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code style={{ background: "#f4f4f4", padding: "2px 4px" }}>
              {children}
            </code>
          );
        },
      }}
    >
      {content || "_답안이 아직 등록되지 않았습니다._"}
    </ReactMarkdown>
  );
}

export default function PublicQuestionDetailPage() {
  const { id } = useParams();
  const questionId = Number(id);
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    if (!questionId) return;
    QuestionApi.get(questionId)
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [questionId]);

  if (!question) return <div>Loading...</div>;

  const answer = question.answer;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h2>
        {question.subject} 문제 No.{question.number}
      </h2>

      <p style={{ color: "#666" }}>
        {question.exam_year}년 {question.round}회차 | 카테고리: {question.tagName}
      </p>

      <pre style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: 15 }}>
        {question.questionText}
      </pre>

      <h3 style={{ marginTop: 40 }}>📘 해설</h3>
      {answer ? (
        <MarkdownPreview content={answer.answerText} />
      ) : (
        <p style={{ color: "#888" }}>아직 답안이 등록되지 않았습니다.</p>
      )}

      <Link to="/questions">← 문제 목록</Link>
    </div>
  );
}
