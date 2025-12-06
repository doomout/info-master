import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../api/api";

export default function QuestionCreatePage() {
  const nav = useNavigate();

  const [year, setYear] = useState(2025);
  const [round, setRound] = useState(1);
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await QuestionApi.create({
        year,
        round,
        subject,
        number,
        questionText,
        difficulty,
      });

      alert("Created!");
      nav("/questions");
    } catch (err) {
      console.error(err);
      alert("Error!");
    }
  };

  return (
    <div>
      <h2>Create Question</h2>

      <form onSubmit={submit}>
        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} />
        </div>

        <div>
          <label>Round:</label>
          <input type="number" value={round} onChange={e => setRound(Number(e.target.value))} />
        </div>

        <div>
          <label>Subject:</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} />
        </div>

        <div>
          <label>Number:</label>
          <input type="number" value={number} onChange={e => setNumber(Number(e.target.value))} />
        </div>

        <div>
          <label>Question Text:</label>
          <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} />
        </div>

        <div>
          <label>Difficulty:</label>
          <input value={difficulty} onChange={e => setDifficulty(e.target.value)} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

