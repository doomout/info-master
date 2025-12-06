import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/api";
import type { Question } from "../../types/Question";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [q, setQ] = useState<Question | null>(null);

  useEffect(() => {
    QuestionApi.get(Number(id))
      .then(res => setQ(res.data))
      .catch(console.error);
  }, [id]);

  if (!q) return <p>Loading...</p>;

  const remove = async () => {
    if (!window.confirm("Delete?")) return;

    await QuestionApi.remove(Number(id));
    nav("/questions");
  };

  return (
    <div>
      <h2>{q.subject} - No.{q.number}</h2>

      <p><strong>Year:</strong> {q.year}</p>
      <p><strong>Round:</strong> {q.round}</p>
      <p><strong>Difficulty:</strong> {q.difficulty}</p>

      <p>{q.questionText}</p>

      <Link to={`/questions/${q.id}/edit`}>Edit</Link>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
