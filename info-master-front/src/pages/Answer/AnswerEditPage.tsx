import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnswerApi } from "../../api/api";
import type { Answer } from "../../types/Answer";

export default function AnswerEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [answer, setAnswer] = useState<Answer | null>(null);
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [score, setScore] = useState<number | null>(null);

  // 답안 상세 조회
  useEffect(() => {
    if (!id) return;
    AnswerApi.get(Number(id))
      .then((res) => {
        setAnswer(res.data);
        setText(res.data.answerText || "");
        setComment(res.data.comment || "");
        setScore(res.data.score ?? null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await AnswerApi.update(Number(id), {
      answerText: text,
      comment,
      score
    });

    alert("답안이 수정되었습니다.");
    nav(`/answers/${id}`);
  };

  if (!answer) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>✏️ 답안 수정</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        
        <label>답변 내용</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: 10 }}
        />

        <label>코멘트</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 10 }}
        />

        <label>점수</label>
        <input
          type="number"
          value={score ?? ""}
          onChange={(e) => setScore(Number(e.target.value))}
          style={{ width: 100, padding: 6 }}
        />

        <button type="submit" style={{ padding: "10px 15px", marginTop: 20 }}>
          저장하기
        </button>
      </form>
    </div>
  );
}
