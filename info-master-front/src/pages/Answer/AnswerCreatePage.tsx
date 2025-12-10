import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { AnswerApi } from "../../api/api";

export default function AnswerCreatePage() {
  const [search] = useSearchParams();
  const questionId = Number(search.get("questionId"));
  const navigate = useNavigate();

  const [value, setValue] = useState<string>("");

  const save = () => {
    AnswerApi.create({
      questionId,
      answerText: value
    }).then(() => navigate(`/questions/${questionId}`));
  };

  return (
    <div className="page">
      <h2>답안 작성</h2>

      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(v) => setValue(v ?? "")}  // 명시적으로 래핑
          height={500}
        />
      </div>

      <button className="btn btn-primary" onClick={save} style={{ marginTop: "20px" }}>
        저장하기
      </button>
    </div>
  );
}
