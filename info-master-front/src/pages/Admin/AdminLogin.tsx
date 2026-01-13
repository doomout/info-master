import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../api/AdminApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await AdminApi.login({ username, password });

      // JWT 저장
      localStorage.setItem("adminToken", res.data.accessToken);

      // 관리자 페이지로 이동
      navigate("/admin", { replace: true });
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "100px auto" }}>
      <h2>관리자 로그인</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            placeholder="아이디"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
