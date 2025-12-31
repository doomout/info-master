import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <h2>정보관리기술사 문제 학습</h2>
        <p>
          연도·회차·카테고리 기준으로<br />
          기술사 기출문제를 학습할 수 있습니다.
        </p>

        <Link to="/questions" className="btn-primary">
          문제 풀러 가기 →
        </Link>
      </section>
    </main>
  );
}
