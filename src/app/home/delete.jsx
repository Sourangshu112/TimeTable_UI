import { Trash2 } from "lucide-react";

const DeleteButton = ({ onDelete }) => {
  return (
    <button
      onClick={onDelete}
      className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-red-100 transition-colors duration-200"
      title="Delete"
    >
        <Trash2 size="24" color="red" />
    </button>
  );
};

export default DeleteButton;