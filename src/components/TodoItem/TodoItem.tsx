import React, { useRef, useState } from "react";
import { ITodo } from "../../interfaces/ITodo";
import { statusColor } from "../../utils/statusColor";
import clsx from "clsx";
import { RemoveIcon } from "../Icons";
import { useAppContext } from "../../providers/AppProvider";
import { useClickAway } from "react-use";

interface Props {
  todo: ITodo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, description, status } = todo;
  const { deleteTodo, updateTodoDescription } = useAppContext();
  const [value, setValue] = useState<string>(description);

  const handlerInputBlur = () => {
    try {
      updateTodoDescription(id, value);
    } catch (e) {
      setValue(description);
    }
  };

  return (
    <li
      className="p-2 w-full text-slate-100 flex justify-between items-center"
      key={`todo-${id}`}
    >
      <div className="flex-1 flex items-center justify-start gap-2 pr-4">
        <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500">
          {id}
        </span>
        <input
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onBlur={handlerInputBlur}
          className="bg-transparent cursor-text outline-none flex-1 focus:bg-slate-700/70 rounded-[4px] px-2"
        />
      </div>
      <div className="flex gap-2">
        <button
          className={clsx(
            `px-1 rounded-[4px] text-sm bg-${statusColor[status]}-400`
          )}
        >
          {status}
        </button>
        <button onClick={() => deleteTodo(id)}>
          <RemoveIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
