import { useState } from "react";
import { AnswerApi } from "../../api/AnswerApi";
import MarkdownEditor from "../../components/markdown/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  questionId: number;
  initialValue?: string;
  onSaved: () => void;
  onCancel: () => void;
};

export default function AnswerEditor({
  questionId,
  initialValue = "",
  onSaved,
  onCancel,
}: Props) {
  const [text, setText] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!text.trim()) {
      alert("답안을 입력하세요!");
      return;
    }

    try {
      setLoading(true);
      await AnswerApi.upsert(questionId, { answerText: text });
      onSaved();

      setTimeout(() => {
        document
          .getElementById("answer-view")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: 30,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        background: "#fafafa",
      }}
    >
      {/* 상태 표시 */}
      <div
        style={{
          marginBottom: 10,
          padding: "6px 12px",
          background: "#fff3cd",
          border: "1px solid #ffeeba",
          borderRadius: 6,
          color: "#856404",
          fontWeight: 500,
        }}
      >
        ✏️ 답안 작성 / 수정 중
      </div>

      {/* 🔹 편집 영역 */}
      <MarkdownEditor value={text} onChange={setText} />

      {/* 🔹 미리보기 */}
      <div
        style={{
          marginTop: 20,
          padding: 15,
          background: "white",
          borderRadius: 6,
          border: "1px solid #eee",
        }}
      >
        <div style={{ marginBottom: 10, fontWeight: 600 }}>
          👀 미리보기
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text || "_미리보기 내용이 없습니다._"}
        </ReactMarkdown>
      </div>

      {/* 버튼 */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button
          onClick={save}
          disabled={loading}
          style={{
            padding: "10px 18px",
            background: "#007bff",
            color: "white",
            borderRadius: 6,
            border: 0,
            cursor: "pointer",
          }}
        >
          저장하기
        </button>

        <button
          onClick={onCancel}
          style={{
            padding: "10px 18px",
            background: "#444",
            color: "white",
            borderRadius: 6,
            border: 0,
            cursor: "pointer",
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}
