import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuestionApi } from "../../api/api";
import type { Question } from "../../types/Question";
import "./QuestionListPage.css";

export default function QuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    QuestionApi.list()
      .then((res) => setQuestions(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h2>Questions</h2>

        <Link to="/questions/create" className="btn-create">
          + Create Question
        </Link>
      </div>

      <div className="questions-grid">
        {questions.map((q) => (
          <div className="question-card" key={q.id}>
            <div className="question-header">
              <span className="question-year">
                {q.year}년 / {q.round}회차
              </span>
              <span className="question-subject">{q.subject}</span>
            </div>

            <div className="question-body">
              <h3 className="question-number">#{q.number}.</h3>
              <p className="question-text">{q.questionText}</p>
            </div>

            <div className="question-actions">
              <Link to={`/questions/${q.id}`} className="btn-view">
                View
              </Link>

              <Link to={`/questions/${q.id}/edit`} className="btn-edit">
                Edit
              </Link>

              <button className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
