import React, { FormEvent, useCallback, useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { GradientButton } from "../Buttons";
import Input from "../Input";
import { ReloadGradientIcon } from "../Icons";

const TodosContainer: React.FC = () => {
  const { contractAddr, instantiateTodoContract, todos, queryTodos, addTodo } =
    useAppContext();
  const [todoValue, setTodoValue] = useState<string>("");

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
              />
              <GradientButton>Add</GradientButton>
            </form>
            <button
              className="active:rotate-180 transition duration-300 ease-in-out"
              onClick={queryTodos}
            >
              <ReloadGradientIcon />
            </button>
          </div>

          <ul className="flex flex-col w-full gap-2 mt-4">
            {todos.length ? (
              <>
                {todos.map(({ id, description, status }) => (
                  <li className="p-2 w-full text-slate-100 flex justify-between items-center">
                    <p>
                      <span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 mr-2">
                        {id}
                      </span>
                      {description}
                    </p>
                    <p>options</p>
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
