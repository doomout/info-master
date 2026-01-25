import "./QuestionCardSkeleton.css";

export default function QuestionCardSkeleton() {
  return (
    <div className="question-card skeleton">
      <div className="skeleton-line short" />
      <div className="skeleton-line" />
      <div className="skeleton-line long" />
      <div className="skeleton-line button" />
    </div>
  );
}
