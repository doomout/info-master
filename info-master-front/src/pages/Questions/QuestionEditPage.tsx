import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import QuestionForm from "./QuestionForm";
import type { Question } from "../../types/Question";

export default function QuestionEditPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    QuestionApi.get(Number(id))
      .then(res => setQuestion(res.data))
      .catch(console.error);
  }, [id]);

  if (!question) return <div>Loading...</div>;

  return <QuestionForm mode="edit" initialData={question} />;
}
