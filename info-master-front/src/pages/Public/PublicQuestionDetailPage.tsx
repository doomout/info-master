import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { AdminApi } from "../../api/AdminApi";
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
  const location = useLocation();
  const navigate = useNavigate();
  const questionId = Number(id);
  const [question, setQuestion] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editAnswer, setEditAnswer] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const isAdminMode = location.pathname.startsWith('/admin') || isAdminAuthenticated;

  const deleteQuestion = async () => {
    if (window.confirm('정말로 이 문제를 삭제하시겠습니까?')) {
      try {
        await QuestionApi.delete(questionId);
        navigate('/admin/questions');
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const reload = async () => {
    const res = await QuestionApi.get(questionId);
    setQuestion(res.data);
    setEditing(false);
  };

  const saveAnswer = async () => {
    try {
      if (question.answer) {
        // 답안 수정
        await QuestionApi.updateAnswer(questionId, { answerText: editAnswer });
      } else {
        // 답안 생성
        await QuestionApi.createAnswer(questionId, { answerText: editAnswer });
      }
      await reload();
    } catch (error) {
      console.error('답안 저장 실패:', error);
      alert('답안 저장에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!questionId) return;
    QuestionApi.get(questionId)
      .then((res) => setQuestion(res.data))
      .catch(console.error);
  }, [questionId]);

  useEffect(() => {
    if (question?.answer) {
      setEditAnswer(question.answer.answerText);
    }
  }, [question]);

  useEffect(() => {
    // 관리자 인증 상태 확인
    AdminApi.me()
      .then(() => setIsAdminAuthenticated(true))
      .catch(() => setIsAdminAuthenticated(false));
  }, []);

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

      {isAdminMode && (
        <div className="admin-actions">
          <Link to={`/admin/questions/${questionId}/edit`} className="btn btn-edit">
            ✏️ 문제 수정
          </Link>
          <button onClick={deleteQuestion} className="btn btn-delete">
            🗑️ 문제 삭제
          </button>
        </div>
      )}

      <div className="question-content">
        {question.questionText}
      </div>

      <h3 className="answer-title">📘 해설</h3>

      {isAdminMode && (
        <div className="admin-answer-actions">
          <button
            className="btn btn-edit"
            onClick={() => setEditing(true)}
          >
            {question.answer ? "✏️ 답안 수정하기" : "✍️ 답안 작성하기"}
          </button>
        </div>
      )}

      {editing ? (
        <div className="answer-editor">
          <div className="editor-container">
            <div className="editor-input">
              <h4>답안 작성</h4>
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                placeholder="답안을 마크다운 형식으로 입력하세요..."
                rows={15}
              />
            </div>
            <div className="editor-preview">
              <h4>미리보기</h4>
              <div className="preview-content">
                <MarkdownPreview content={editAnswer || "_미리보기 내용이 없습니다._"} />
              </div>
            </div>
          </div>
          <div className="editor-actions">
            <button className="btn btn-save" onClick={saveAnswer}>
              저장
            </button>
            <button className="btn btn-cancel" onClick={() => setEditing(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        answer ? (
          <div className="answer-content">
            <MarkdownPreview content={answer.answerText} />
          </div>
        ) : (
          <p className="answer-empty">아직 답안이 등록되지 않았습니다.</p>
        )
      )}

      <Link to={isAdminMode ? "/admin/questions" : "/questions"} className="back-link">
        ← 문제 목록
      </Link>
    </div>
  );
}
