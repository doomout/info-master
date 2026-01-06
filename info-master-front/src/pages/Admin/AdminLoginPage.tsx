import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../api/AdminApi";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await AdminApi.login({ username, password });
      navigate("/admin");
    } catch {
      // 로그인 실패
    }
  };

  return (
    <div>
      <h2>관리자 로그인</h2>

      <input
        placeholder="아이디"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>로그인</button>
    </div>
  );
}
