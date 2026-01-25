import { useState, useEffect } from "react";
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
  // 자동 저장용 상태(1분마다 임시 자동 저장)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [autoSaving, setAutoSaving] = useState(false);
  const [dirty, setDirty] = useState(false); // 변경 여부

  // 자동 저장 함수(1분마다 호출)
  const autoSave = async () => {
    if (!dirty) return;
    if (!text.trim()) return;

    try {
      setAutoSaving(true);
      await AnswerApi.upsert(questionId, { answerText: text });
      setLastSavedAt(new Date());
      setDirty(false);
    } catch (e) {
      console.error("자동 저장 실패", e);
    } finally {
      setAutoSaving(false);
    }
  };

  // 수동 저장 함수(저장 버튼 클릭 시)
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

  // 1분 자동 저장(한 번만)
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 입력 멈춤 감지(5초)
  useEffect(() => {
    if (!dirty) return;

    const timeout = setTimeout(() => {
      autoSave();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [text]);

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
        {autoSaving 
          ? "💾 자동 저장 중..." : lastSavedAt
          ? `✔ 임시 저장됨 (${lastSavedAt.toLocaleTimeString()})`
          : "✏️ 답안 작성 중"
        }
      </div>

      {/* 🔹 편집 영역 */}
      <MarkdownEditor value={text} onChange={(v) => {
        setText(v); 
        setDirty(true);
        }} 
      />

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
