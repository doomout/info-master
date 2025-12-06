import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/api";
import type { Question } from "../../types/Question";
import { toast } from "react-toastify";

export default function QuestionEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [q, setQ] = useState<Question | null>(null);

  useEffect(() => {
    QuestionApi.get(Number(id))
      .then(res => setQ(res.data))
      .catch(console.error);
  }, [id]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!q) return;
    setQ({ ...q, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q) return;
    try {
      await QuestionApi.update(Number(id), q);
      toast.success("수정되었습니다!");
      nav("/questions");
    } catch (err) {
      console.error(err);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  if (!q) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Question</h2>

      <form onSubmit={submit}>
        <input name="year" type="number" value={q.year} onChange={change} />
        <input name="round" type="number" value={q.round} onChange={change} />
        <input name="subject" value={q.subject} onChange={change} />
        <input name="number" type="number" value={q.number} onChange={change} />
        <textarea name="questionText" value={q.questionText} onChange={change} />

        <div style={{ marginTop: "16px" }}>
            <input name="difficulty" value={q.difficulty || ""} onChange={change} />
            <button type="submit">Update</button>

            <button type="button" style={{ marginLeft: "12px" }}onClick={() => nav("/questions")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
