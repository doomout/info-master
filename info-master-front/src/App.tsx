import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

/* 관리자 페이지 */
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminQuestionDetailPage from "./pages/Admin/AdminQuestionDetailPage";
import AdminQuestionCreatePage from "./pages/Admin/AdminQuestionCreatePage";
import AdminQuestionEditPage from "./pages/Admin/AdminQuestionEditPage";
import AdminTagListPage from "./pages/Admin/AdminTagListPage";
import AdminTagCreatePage from "./pages/Admin/AdminTagCreatePage";
import AdminTagEditPage from "./pages/Admin/AdminTagEditPage";

/* 사용자 페이지 */
import PublicQuestionDetailPage from "./pages/Public/PublicQuestionDetailPage";

/* Layout */
import Header from "./components/Header";
import Container from "./components/Container";
import PublicQuestionListPage from "./pages/Public/PublicQuestionListPage";
import AdminQuestionListPage from "./pages/Admin/AdminQuestionListPage";

/* 회원 가입은 곧 사라질 페이지 */
import MemberListPage from "./pages/Members/MemberListPage";
import MemberCreatePage from "./pages/Members/MemberCreatePage";
import MemberDetailPage from "./pages/Members/MemberDetailPage";
import MemberEditPage from "./pages/Members/MemberEditPage";

export default function App() {
  return (
    <Container>
      <Header />

      <Routes>
        {/* Public  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<PublicQuestionListPage  />} />
        <Route path="/questions/:id" element={<PublicQuestionDetailPage  />} />

        {/* Admin  */}
        <Route path="/admin" element={<AdminHomePage />} />

        {/* Question Admin */}
        <Route path="/admin/questions/:id" element={<AdminQuestionDetailPage />} />
        <Route path="/admin/questions" element={<AdminQuestionListPage />} />
        <Route path="/admin/questions/create" element={<AdminQuestionCreatePage />} />
        <Route path="/admin/questions/:id/edit" element={<AdminQuestionEditPage />} />

        {/* Member Admin */}
        <Route path="/admin/members" element={<MemberListPage />} />
        <Route path="/admin/members/create" element={<MemberCreatePage />} />
        <Route path="/admin/members/:id" element={<MemberDetailPage />} />
        <Route path="/admin/members/:id/edit" element={<MemberEditPage />} />

        {/* Tag Admin */}
        <Route path="/admin/tags" element={<AdminTagListPage />} />
        <Route path="/admin/tags/new" element={<AdminTagCreatePage />} />
        <Route path="/admin/tags/:id/edit" element={<AdminTagEditPage />} />
      </Routes>
    </Container>
  );
}
