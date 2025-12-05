import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MemberListPage from "./pages/MemberListPage";
import MemberCreatePage from "./pages/MemberCreatepage";
import MemberDetailPage from "./pages/MemberDetailPage";
import MemberEditPage from "./pages/MemberEditPage";
import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/members" element={<MemberListPage />} />
        <Route path="/members/create" element={<MemberCreatePage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
        <Route path="/members/:id/edit" element={<MemberEditPage />} />
      </Routes>
    </div>
  );
}
