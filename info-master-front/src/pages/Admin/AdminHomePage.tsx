import { Link } from "react-router-dom";
import "./AdminPage.css";
import { useEffect } from "react";
import { AdminApi } from "../../api/AdminApi";

export default function AdminHomePage() {
  useEffect(() => {
    AdminApi.me()
      .then(() => console.log("✅ me success"))
      .catch(e => console.log("❌ me error", e));
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">관리자 대시보드</h2>
      <p className="admin-desc">
        문제 · 답안 · 카테고리를 관리하는 관리자 전용 페이지입니다.
      </p>

      <div className="admin-grid">
        {/* 문제 관리 */}
        <div className="admin-card">
          <h3>📘 문제 관리</h3>
          <p>문제 생성, 수정, 삭제</p>
          <div className="admin-actions">
            <Link to="/admin/questions">문제 목록</Link>
            <Link to="/admin/questions/create">문제 생성</Link>
          </div>
        </div>

        {/* 카테고리 관리 */}
        <div className="admin-card">
          <h3>🏷 카테고리 관리</h3>
          <p>문제 분류용 카테고리 관리</p>
          <div className="admin-actions">
            <Link to="/admin/tags">카테고리 목록</Link>
            <Link to="/admin/tags/new">카테고리 생성</Link>
          </div>
        </div>

        {/* 회원 관리 (지금은 옵션) */}
        <div className="admin-card disabled">
          <h3>👤 회원 관리</h3>
          <p>현재는 관리자 단일 계정만 사용 중</p>
          <span className="disabled-text">추후 확장 예정</span>
        </div>
      </div>
    </div>
  );
}
