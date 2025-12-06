import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuestionApi } from "../api/api";
import type { Question } from "../types/Question";

export default function QuestionListPage() {
  const [list, setList] = useState<Question[]>([]);

  useEffect(() => {
    QuestionApi.list()
      .then(res => setList(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Question List</h2>

      <Link to="/questions/create">Create Question</Link>

      <ul>
        {list.map(q => (
          <li key={q.id}>
            <Link to={`/questions/${q.id}`}>
              {q.year}년도 {q.round}회 ({q.subject}) - No.{q.number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
