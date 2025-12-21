type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MarkdownHelpModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "90%",
          maxWidth: 600,
          lineHeight: 1.6
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 10 }}>📘 Markdown 간단 사용법</h3>

        <ul style={{ paddingLeft: 20, fontSize: 14 }}>
          <li><code># 제목</code> → 큰 제목</li>
          <li><code>## 제목</code> → 중간 제목</li>
          <li><code>**굵게**</code>, <code>*기울임*</code></li>
          <li><code>- 리스트</code>, <code>1. 번호 리스트</code></li>
          <li><code>```</code> 코드블럭 <code>```</code></li>
          <li><code>&gt; 인용문</code></li>
          <li>줄바꿈은 <b>스페이스 두 번</b></li>
        </ul>

        <div style={{ textAlign: "right", marginTop: 15 }}>
          <button
            onClick={onClose}
            style={{
              padding: "6px 12px",
              background: "#007bff",
              color: "#fff",
              border: 0,
              borderRadius: 4
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
