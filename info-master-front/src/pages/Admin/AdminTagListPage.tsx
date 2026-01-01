import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TagApi } from "../../api/TagApi";
import type { Tag } from "../../types/Tag";
import "./AdminTagListPage.css";

export default function AdminTagListPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    TagApi.getAll().then(res => setTags(res.data));
  }, []);

  const remove = async (id: number) => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await TagApi.delete(id);

      setTags(prev => prev.filter(t => t.id !== id));
      alert("카테고리가 삭제되었습니다.");
    } catch (err: any) {
      console.error(err);

      // 서버에서 내려준 메시지가 있으면 우선 사용
      const message =
        "이 카테고리는 이미 문제에 사용 중이라 삭제할 수 없습니다.\n" +
        "먼저 해당 문제의 카테고리를 변경하세요."

      alert(message);
    }
  };

  return (
    <div className="admin-page">
      {/* 헤더 */}
      <div className="admin-header">
        <div>
          <h2>카테고리 관리</h2>
          <p className="desc">문제 분류에 사용되는 내부 카테고리입니다.</p>
        </div>

        <Link to="/admin/tags/new" className="btn-primary">
          + 새 카테고리
        </Link>
      </div>

      {/* 카드 영역 */}
      <div className="admin-card">
        {tags.length === 0 ? (
          <div className="empty">
            아직 등록된 카테고리가 없습니다.
          </div>
        ) : (
          <table className="tag-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>카테고리 이름</th>
                <th style={{ width: 160 }}>관리</th>
              </tr>
            </thead>

            <tbody>
              {tags.map(tag => (
                <tr key={tag.id}>
                  <td>{tag.id}</td>
                  <td className="tag-name">{tag.name}</td>
                  <td>
                    <div className="actions">
                      <Link
                        to={`/admin/tags/${tag.id}/edit`}
                        className="btn-sm"
                      >
                        수정
                      </Link>

                      <button
                        onClick={() => remove(tag.id)}
                        className="btn-sm danger"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
