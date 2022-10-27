import React, { FormEvent, useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { GradientButton } from "../Buttons";
import Input from "../Input";
import { GoPlus } from "react-icons/go";
import { EditIcon, RemoveIcon } from "../Icons";
import clsx from "clsx";
import { TodoStatus } from "../../interfaces/TodoStatus";
import { statusColor } from "../../utils/statusColor";
import Filter from "../Filter";

const TodosContainer: React.FC = () => {
  const { contractAddr, instantiateTodoContract, todos, queryTodos, addTodo } =
    useAppContext();
  const [todoValue, setTodoValue] = useState<string>("");
  const [filter, setFilter] = useState<TodoStatus | "">("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo(todoValue);
  };

  return (
    <div className="h-full w-full flex justify-center">
      {contractAddr ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center gap-4">
            <form
              onSubmit={onSubmit}
              className="flex items-center justify-center gap-4 flex-1"
            >
              <Input
                type="text"
                value={todoValue}
                onChange={({ target }) => setTodoValue(target.value)}
                autoComplete="off"
                placeholder="Add a new 'todo' and press 'Enter'"
              />
              <GradientButton className="h-[32px]">
                <GoPlus />
              </GradientButton>
            </form>
          </div>
          <Filter selectedFilter={filter} setFilter={setFilter} />
          <ul className="flex flex-col w-full gap-2 mt-4">
            {todos.length ? (
              <>
                {todos.map(({ id, description, status }) => (
                  <li
                    className="p-2 w-full text-slate-100 flex justify-between items-center"
                    key={`todo-${id}`}
                  >
                    <p>
                      <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 mr-2">
                        {id}
                      </span>
                      <input
                        value={description}
                        className="bg-transparent cursor-text outline-none"
                      />
                    </p>
                    <div className="flex gap-2">
                      <button
                        className={clsx(
                          `px-1 rounded-[4px] text-sm bg-${statusColor[status]}-400`
                        )}
                      >
                        {status}
                      </button>
                      <button>
                        <RemoveIcon />
                      </button>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <p className="text-slate-100 text-center p-4 mt-4  text-xl">
                You don't have any todo in your todo list, try adding one
              </p>
            )}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <GradientButton onClick={instantiateTodoContract}>
            Instantiate Todo-List
          </GradientButton>
        </div>
      )}
    </div>
  );
};

export default TodosContainer;
