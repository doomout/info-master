import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../../api/QuestionApi";
import { TagApi } from "../../api/TagApi";
import type { Tag } from "../../types/Tag";
import type { Question } from "../../types/Question";
import "./QuestionForm.css";

/**
 * 이 컴포넌트는 "생성 / 수정"을 모두 처리하는 공통 폼
 *
 * mode:
 *  - create : 문제 생성
 *  - edit   : 문제 수정
 *
 * initialData:
 *  - edit 모드일 때 기존 문제 데이터
 */
type Props = {
  mode: "create" | "edit";
  initialData?: Question;
};

/**
 * 폼에서 관리할 입력값들의 타입
 * 숫자 입력이지만 처음엔 빈 값("")이 필요해서
 * number | "" 형태로 정의함
 */
interface FormState {
  exam_year: number | "";
  round: number | "";
  number: number | "";
  questionText: string;
}

/**
 * 연도 선택용 데이터
 * 최근 10년치 자동 생성
 */
const YEARS = Array.from({ length: 10 }, (_, i) => 2025 - i);

export default function QuestionForm({ mode, initialData }: Props) {
  /**
   * 페이지 이동을 위한 훅
   * nav("/questions") 이런 식으로 사용
   */
  const nav = useNavigate();

  /**
   * 태그 목록 (카테고리)
   */
  const [tags, setTags] = useState<Tag[]>([]);

  /**
   * 선택된 태그 ID
   * - create: 처음엔 ""
   * - edit: 기존 question의 tagId
   */
  const [selectedTagId, setSelectedTagId] = useState<number | "">(
    initialData?.tagId ?? ""
  );

  /**
   * 폼 입력값 상태
   * edit 모드면 기존 값으로 초기화
   * create 모드면 빈 값으로 시작
   */
  const [form, setForm] = useState<FormState>({
    exam_year: initialData?.exam_year ?? "",
    round: initialData?.round ?? "",
    number: initialData?.number ?? "",
    questionText: initialData?.questionText ?? "",
  });

  /**
   * 컴포넌트가 처음 렌더링될 때
   * 태그 목록을 서버에서 불러옴
   */
  useEffect(() => {
    TagApi.getAll()
      .then(res => setTags(res.data))
      .catch(console.error);
  }, []);

  /**
   * input / textarea / select 값 변경 처리
   *
   * name 속성을 key로 사용해서
   * form 상태를 한 번에 갱신
   */
  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * 폼 제출 처리
   * - create / edit 모드에 따라 API 분기
   */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 카테고리 선택 안 했으면 중단
    if (!selectedTagId) {
      alert("카테고리를 선택하세요.");
      return;
    }

    /**
     * 서버로 보낼 데이터
     * form 값은 string일 수 있으므로 Number로 변환
     */
    const payload = {
      exam_year: Number(form.exam_year),
      round: Number(form.round),
      number: Number(form.number),
      questionText: form.questionText,
      tagId: selectedTagId,
    };

    try {
      if (mode === "create") {
        // 문제 생성
        await QuestionApi.create(payload);
        alert("문제가 생성되었습니다!");
      } else {
        // 문제 수정
        await QuestionApi.update(initialData!.id, payload);
        alert("문제가 수정되었습니다!");
      }

      // 작업 완료 후 목록으로 이동
      nav("/admin/questions");
    } catch (err) {
      console.error(err);
      alert("저장 중 오류 발생");
    }
  };

  return (
    <div className="question-form-container">
      {/* 페이지 제목 */}
      <h2 className="page-title">
        {mode === "create" ? "문제 생성" : "문제 수정"}
      </h2>

      {/* 실제 폼 */}
      <form onSubmit={submit} className="question-form-card">
        {/* 연도 */}
        <div className="form-row">
          <label>연도</label>
          <select
            name="exam_year"
            value={form.exam_year}
            onChange={change}
            required
          >
            <option value="">연도 선택</option>
            {YEARS.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* 회차 */}
        <div className="form-row">
          <label>회차</label>
          <input
            type="number"
            name="round"
            value={form.round}
            onChange={change}
            required
          />
        </div>

        {/* 문제 번호 */}
        <div className="form-row">
          <label>문제 번호</label>
          <input
            type="number"
            name="number"
            value={form.number}
            onChange={change}
            required
          />
        </div>

        {/* 카테고리 */}
        <div className="form-row">
          <label>카테고리</label>
          <select
            value={selectedTagId}
            onChange={e => setSelectedTagId(Number(e.target.value))}
            required
          >
            <option value="">카테고리 선택</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* 문제 내용 */}
        <div className="form-row">
          <label>문제</label>
          <textarea
            name="questionText"
            value={form.questionText}
            onChange={change}
            rows={6}
            required
          />
        </div>

        {/* 버튼 영역 */}
        <div className="form-actions">
          <button type="submit" className="btn-save">
            {mode === "create" ? "생성" : "수정"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => nav("/admin/questions")}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
