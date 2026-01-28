import { useState } from "react";
import MarkHelp from "./MarkHelp";

type Props = {
  value: string;
  onChange: (value: string) => void;
  showHelpButton?: boolean;
};

function createMarkdownTable(rows: number, cols: number) {
  const header = `| ${Array(cols).fill("").join(" | ")} |`;
  const divider = `| ${Array(cols).fill("---").join(" | ")} |`;

  const body = Array.from({ length: rows - 1 })
    .map(() => `| ${Array(cols).fill("").join(" | ")} |`)
    .join("\n");

  return [header, divider, body].join("\n");
}


export default function MarkdownEditor({ value, onChange, showHelpButton = true }: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  // 행과 열 상태
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  // 표 삽입 함수
  const insertTable = () => {
    const table = createMarkdownTable(rows, cols);
    onChange(value + "\n\n" + table + "\n");
    setTableOpen(false);
  };


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

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setTableOpen(true)}>
            📊 표 삽입
          </button>
        </div>

        {showHelpButton && (
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
        )}
      </div>

      {tableOpen && (
        <div
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "white",
            marginBottom: 10,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            행:
            <input
              type="number"
              min={2}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              style={{ width: 60, marginLeft: 6 }}
            />
            열:
            <input
              type="number"
              min={2}
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              style={{ width: 60, marginLeft: 6 }}
            />
          </div>

          <button onClick={insertTable}>표 삽입</button>
          <button onClick={() => setTableOpen(false)}>취소</button>
        </div>
      )}


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

      <MarkHelp
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </>
  );
}
