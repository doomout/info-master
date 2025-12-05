// Member 삭제 기능 (DELETE)
import api from "../api/api";

export default function DeleteButton({ id, onDelete }: { id: number; onDelete: () => void }) {
  const remove = async () => {
    if (!confirm("Delete this member?")) return;

    try {
      await api.delete(`/api/members/${id}`);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Error deleting member");
    }
  };

  return <button onClick={remove}>Delete</button>;
}
