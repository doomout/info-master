import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import MemberListPage from "./pages/Members/MemberListPage";
import MemberCreatePage from "./pages/Members/MemberCreatePage";
import MemberDetailPage from "./pages/Members/MemberDetailPage";
import MemberEditPage from "./pages/Members/MemberEditPage";

import QuestionListPage from "./pages/Questions/QuestionListPage";
import QuestionCreatePage from "./pages/Questions/QuestionCreatePage";
import QuestionDetailPage from "./pages/Questions/QuestionDetailPage";
import QuestionEditPage from "./pages/Questions/QuestionEditPage";

import TagListPage from "./pages/Tag/TagListPage";
import TagCreatePage from "./pages/Tag/TagCreatepage";
import TagEditPage from "./pages/Tag/TagEditPage";

import Header from "./components/Header";
import Container from "./components/Container";

export default function App() {
  return (
    <Container>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Member Routes */}
        <Route path="/members" element={<MemberListPage />} />
        <Route path="/members/create" element={<MemberCreatePage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
        <Route path="/members/:id/edit" element={<MemberEditPage />} />

        {/* Question Routes */}
        <Route path="/questions" element={<QuestionListPage />} />
        <Route path="/questions/create" element={<QuestionCreatePage />} />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />
        <Route path="/questions/:id/edit" element={<QuestionEditPage />} />

        {/* Tag Routes */}
        <Route path="/tags" element={<TagListPage />} />
        <Route path="/tags/new" element={<TagCreatePage />} />
        <Route path="/tags/:id" element={<TagEditPage />} />
        
        {/* Question */}
        <Route path="/questions" element={<QuestionListPage />} />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />
        <Route path="/questions/:id/edit" element={<QuestionEditPage />} />
        <Route path="/questions/new" element={<QuestionCreatePage />} />

      </Routes>
    </Container>
  );
}
