import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TagApi } from "../../api/api";
import type { Tag } from "../../types/Tag";

export default function TagListPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    TagApi.getAll().then((res) => setTags(res.data));
  }, []);

  const remove = (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    TagApi.delete(id).then(() => {
      setTags(tags.filter((t) => t.id !== id));
    });
  };

  return (
    <div>
      <h2>태그 목록</h2>

      <Link to="/tags/new">➕ 태그 생성</Link>

      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.name}
            {" "}
            <Link to={`/tags/${tag.id}`}>수정</Link>
            {" "}
            <button onClick={() => remove(tag.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
