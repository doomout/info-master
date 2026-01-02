import { Routes, Route } from "react-router-dom";

/* Layout */
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";

/* Public Pages */
import HomePage from "./pages/HomePage";
import PublicQuestionListPage from "./pages/Public/PublicQuestionListPage";
import PublicQuestionDetailPage from "./pages/Public/PublicQuestionDetailPage";

/* Admin Pages */
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminRouteGuard from "./pages/Admin/AdminRouteGuard";

import AdminQuestionListPage from "./pages/Admin/AdminQuestionListPage";
import AdminQuestionDetailPage from "./pages/Admin/AdminQuestionDetailPage";
import AdminQuestionCreatePage from "./pages/Admin/AdminQuestionCreatePage";
import AdminQuestionEditPage from "./pages/Admin/AdminQuestionEditPage";

import AdminTagListPage from "./pages/Admin/AdminTagListPage";
import AdminTagCreatePage from "./pages/Admin/AdminTagCreatePage";
import AdminTagEditPage from "./pages/Admin/AdminTagEditPage";

export default function App() {
  return (
    <Routes>
      {/* 🌐 일반 사용자 */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<PublicQuestionListPage />} />
        <Route path="/questions/:id" element={<PublicQuestionDetailPage />} />
      </Route>

      {/* 🔐 관리자 */}
      <Route path="/admin" element={<AdminRouteGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />

          {/* 문제 관리 */}
          <Route path="questions" element={<AdminQuestionListPage />} />
          <Route path="questions/create" element={<AdminQuestionCreatePage />} />
          <Route path="questions/:id" element={<AdminQuestionDetailPage />} />
          <Route path="questions/:id/edit" element={<AdminQuestionEditPage />} />

          {/* 카테고리 관리 */}
          <Route path="tags" element={<AdminTagListPage />} />
          <Route path="tags/new" element={<AdminTagCreatePage />} />
          <Route path="tags/:id/edit" element={<AdminTagEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
