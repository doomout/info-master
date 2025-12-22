import { useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import MarkHelp from "./MarkHelp";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: Props) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }}
      >
        <h3>📝 답안 내용</h3>
        <button
          onClick={() => setShowHelp(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            fontSize: 14
          }}
        >
          📘 Markdown 도움말
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={18}
        style={{
          width: "100%",
          padding: 12,
          border: "1px solid #ccc",
          borderRadius: 6,
          fontFamily: "Consolas, monospace",
          marginBottom: 20
        }}
      />

      <h3>👀 미리보기</h3>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: 14,
          background: "#fff",
          lineHeight: 1.7
        }}
      >
        <MarkdownViewer content={value} />
      </div>

      <MarkHelp
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </>
  );
}
