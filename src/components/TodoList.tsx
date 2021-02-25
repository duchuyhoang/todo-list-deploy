import React, { FC } from "react";
import "../styles/TodoList.css";
import { VscChromeClose } from "react-icons/vsc";
export interface ITodoItem {
  id: number;
  description: string;
  isCompleted: boolean;
}

interface ITodoListProps {
  list: ITodoItem[];
  deleteItem: (id: number) => void;
  tickABox: (id: number, status: boolean) => void;
}

export const TodoList: FC<ITodoListProps> = ({
  list,
  deleteItem,
  tickABox,
}) => {
  return (
    <section>
      {list.map((todoItem: ITodoItem) => (
        <div className="todo-item" key={`edit-${todoItem.id}`}>
          <div className="tick-container d-flex align-center">
            <input
              type="checkbox"
              id={`"checkbox-"${todoItem.id}`}
              checked={todoItem.isCompleted}
              onChange={() => {
                tickABox(todoItem.id, !todoItem.isCompleted);
              }}
            />
            <label
              htmlFor={`"checkbox-"${todoItem.id}`}
              className="label-checkbox"
            ></label>
          </div>
          <div
            className={`item-description ${
              todoItem.isCompleted ? "item-complete" : ""
            }`}
          >
            {todoItem.description}
          </div>
          <div className="d-flex align-center icon-container">
            <VscChromeClose
              size="20"
              onClick={() => {
                deleteItem(todoItem.id);
              }}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default TodoList;
