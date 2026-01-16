import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../Questions/QuestionDetailPage.css";

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
    <div className="question-detail-container">
      <h2 className="question-title">
        {question.subject} 문제 No.{question.number}
      </h2>

      <p className="question-meta">
        {question.examYear} 년, {question.round} 회차, 카테고리 : {question.tagName}
      </p>

      <div className="question-content">
        {question.questionText}
      </div>

      <h3 className="answer-title">📘 해설</h3>

      {answer ? (
        <div className="answer-content">
          <MarkdownPreview content={answer.answerText} />
        </div>
      ) : (
        <p className="answer-empty">아직 답안이 등록되지 않았습니다.</p>
      )}

      <Link to="/questions" className="back-link">
        ← 문제 목록
      </Link>
    </div>
  );
}
