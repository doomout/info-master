import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>정보관리기술사 문제·답안 관리 시스템</h1>

      <p className="home-description">
        기출문제를 저장하고, 연도/회차/출제과목 기준으로 관리할 수 있습니다.
        <br />
        추후 답안 작성과 분석 기능도 확장될 예정입니다.
      </p>

      <div className="home-buttons">
        <Link to="/questions" className="home-btn blue">문제 관리</Link>
        <Link to="/answers" className="home-btn green">답안 관리</Link>
        <Link to="/members" className="home-btn gray">회원 관리</Link>
        <Link to="/tags" className="home-btn red">태그 관리</Link>
      </div>
    </div>
  );
}
