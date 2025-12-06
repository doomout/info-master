import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import MemberListPage from "./pages/Members/MemberListPage";
import MemberCreatePage from "./pages/Members/MemberCreatePage";
import MemberDetailPage from "./pages/Members/MemberDetailPage";
import MemberEditPage from "./pages/Members/MemberEditPage";
import QuestionListPage from "./pages/Questions/QuestionListPage";
import QuestionCreatePage from "./pages/Questions/QuestionCreatePage";
import QuestionDetailPage from "./pages/Questions/QuestionDetailPage";
import QuestionEditPage from "./pages/Questions/QuestionEditPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/members" element={<MemberListPage />} />
        <Route path="/members/create" element={<MemberCreatePage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
        <Route path="/members/:id/edit" element={<MemberEditPage />} />

        <Route path="/questions" element={<QuestionListPage />} />
        <Route path="/questions/create" element={<QuestionCreatePage />} />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />
        <Route path="/questions/:id/edit" element={<QuestionEditPage />} />
      </Routes>
    </Layout>
  );
}
