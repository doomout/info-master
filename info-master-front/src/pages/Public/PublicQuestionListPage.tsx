import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { TagApi } from "../../api/TagApi";
import type { Question } from "../../types/Question";
import type { Tag } from "../../types/Tag";
import "../Questions/QuestionListPage.css";

export default function PublicQuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  // 문제 로딩 상태 
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<number | "">("");
  const navigate = useNavigate();

  const filteredQuestions = selectedTag === "" 
    ? questions 
    : questions.filter(q => q.tagId === selectedTag);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      QuestionApi.list(),
      TagApi.getAll()
    ])
      .then(([{ data: questionsData }, { data: tagsData }]) => {
        if (!cancelled) {
          setQuestions(questionsData);
          setTags(tagsData);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="questions-container">
      {/* 헤더 */}
      <div className="questions-header">
        <h2>문제 목록</h2>
        <p className="questions-desc">
          기술사 시험 대비를 위한 문제 정리 자료입니다.
        </p>
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
          {/* Skeleton 로딩 추가 */}
          {loading && 
            Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={5}>로딩 중...</td>
              </tr>
          ))}

          {!loading && filteredQuestions.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">
                {selectedTag === "" ? "아직 등록된 문제가 없습니다." : "선택한 카테고리에 문제가 없습니다."}
              </td>
            </tr>
          )}

          {!loading && filteredQuestions.map((q) => (
            <tr key={q.id} onClick={() => navigate(`/questions/${q.id}`)}>
              <td className="question-year">
                {q.examYear}년 / {q.round}회차
              </td>
              <td>
                <span className="question-type">{q.tagName}</span>
              </td>
              <td className="question-number">#{q.number}</td>
              <td className="question-text">{q.questionText}</td>
              <td className="question-actions">
                <span className="btn-view-only">자세히 보기</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
