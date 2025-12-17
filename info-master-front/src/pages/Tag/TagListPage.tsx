import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TagApi } from "../../api/TagApi";
import type { Tag } from "../../types/Tag";
import "./tag.css";

export default function TagListPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    TagApi.getAll().then(res => setTags(res.data));
  }, []);

  const remove = (id: number) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    TagApi.delete(id).then(() => setTags(tags.filter(t => t.id !== id)));
  };

  return (
    <div className="tag-page">
      <div className="page-title">태그 관리</div>

      <Link to="/tags/new" className="btn btn-primary">
        + 새 태그
      </Link>

      <table className="tag-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>태그 이름</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {tags.map(tag => (
            <tr key={tag.id}>
              <td>{tag.id}</td>
              <td>{tag.name}</td>
              <td>
                <Link to={`/tags/${tag.id}`} className="btn">
                  수정
                </Link>
                <button onClick={() => remove(tag.id)} className="btn btn-danger">
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
