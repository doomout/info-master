import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { AnswerApi } from "../../api/api";
import type { Answer } from "../../types/Answer";

export default function AnswerDetailPage() {
  const { id } = useParams();
  const [answer, setAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    if (!id) return;

    AnswerApi.get(Number(id)).then(res => {
      setAnswer(res.data as Answer); // 타입 안정화
    });
  }, [id]);

  if (!answer) return <div className="page">로딩...</div>;

  return (
    <div className="page">
      <h2>답안 보기</h2>

      <MDEditor.Markdown source={answer.answerText} />
    </div>
  );
}
