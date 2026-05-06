import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { TagApi } from "../../api/TagApi";
import type { Question } from "../../types/Question";
import type { Tag } from "../../types/Tag";
import "../Questions/QuestionListPage.css";

export default function AdminQuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<number | "">("");

  useEffect(() => {
    Promise.all([
      QuestionApi.list(),
      TagApi.getAll()
    ])
      .then(([{ data: questionsData }, { data: tagsData }]) => {
        setQuestions(questionsData);
        setTags(tagsData);
      })
      .catch(console.error);
  }, []);

  // 관리자 전용 삭제
  const deleteQuestion = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await QuestionApi.delete(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      alert("삭제되었습니다.");
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const filteredQuestions = selectedTag === "" 
    ? questions 
    : questions.filter(q => q.tagId === selectedTag);

  return (
    <div className="questions-container">
      {/* 헤더 */}
      <div className="questions-header">
        <h2>문제 관리</h2>

        <Link to="/admin/questions/create" className="btn-create">
          + 문제 생성
        </Link>
      </div>

      {/* 필터 */}
      <div className="filter-section">
        <label htmlFor="tag-filter">카테고리 필터:</label>
        <select 
          id="tag-filter" 
          value={selectedTag} 
          onChange={(e) => setSelectedTag(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">전체</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>

      {/* 리스트 */}
      <table className="questions-table">
        <thead>
          <tr>
            <th>연도/회차</th>
            <th>카테고리</th>
            <th>문제 번호</th>
            <th>문제 내용</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q) => (
            <tr key={q.id}>
              <td className="question-year">
                {q.examYear}년 / {q.round}회차
              </td>
              <td>
                <span className="question-type">{q.tagName}</span>
              </td>
              <td className="question-number">#{q.number}</td>
              <td className="question-text">{q.questionText}</td>
              <td className="question-actions">
                <Link
                  to={`/admin/questions/${q.id}`}
                  className="btn-primary"
                >
                  {q.answer ? "답안 수정" : "답안 작성"}
                </Link>

                <Link
                  to={`/admin/questions/${q.id}/edit`}
                  className="btn-edit"
                >
                  문제 수정
                </Link>

                {/* 사용자 화면 확인용 */}
                <Link
                  to={`/questions/${q.id}`}
                  className="btn-view"
                  target="_blank"
                >
                  사용자 화면 보기
                </Link>

                {/* 문제 삭제 */}
                <button
                  className="btn-delete"
                  onClick={() => deleteQuestion(q.id)}
                >
                  문제 삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
