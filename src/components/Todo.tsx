import React, { useState, useCallback, useEffect } from "react";
import TodoForm from "./TodoForm";
import "../styles/Todo.css";
import TodoList, { ITodoItem } from "./TodoList";
import Footer from "./Footer";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Todo() {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [getLocalData, updateLocalData] = useLocalStorage("todo");
  const [list, setList] = useState<ITodoItem[]>([]);

  //   Use callback to remmerber this func because everytime you update state this function is a new one so when it pass to TodoForm Component is will make it re-render.


  useEffect(() => {
    let data: ITodoItem[] = getLocalData();
    changeCheckAllState(data);
    setList(data);
  }, []);

  useEffect(() => {
    updateLocalData(list);
  }, [list]);

  const addTodo = useCallback(
    (description: string) => {
      setList([
        ...list,
        {
          id: new Date().getTime(),
          description: description,
          isCompleted: false,
        },
      ]);
    },
    [list]
  );

  const deleteById = (id: number) => {
    let newList: ITodoItem[] = list.filter((item) => item.id !== id);
    newList.length == 0 && setIsCheckAll(false);
    setList(newList);
  };

  const changeCheckAllState = (list: ITodoItem[]) => {
    if (list.filter((item) => !item.isCompleted).length === 0)
      setIsCheckAll(true);
    else setIsCheckAll(false);
  };

  const tickBox = (id: number, status: boolean) => {
    const itemIndex = list.findIndex((todo) => todo.id === id);

    if (Number.isInteger(itemIndex)) {
      let a = [...list];

      a.splice(itemIndex, 1, { ...list[itemIndex], isCompleted: status });

      changeCheckAllState(a);

      setList(a);
    }
  };

  const checkAll = () => {
    if (!isCheckAll)
      setList(
        list.map((todo) => {
          return {
            ...todo,
            isCompleted: true,
          };
        })
      );
    else {
      setList(
        list.map((todo) => {
          return {
            ...todo,
            isCompleted: false,
          };
        })
      );
    }
    setIsCheckAll((prev) => !prev);
  };

  const filterList = (list: ITodoItem[], status: string) => {
    switch (status) {
      case "All":
        return list;

      case "Activated":
        return list.filter((todo) => todo.isCompleted === false);

      case "Completed":
        return list.filter((todo) => todo.isCompleted === true);
      default:
        return list;
    }
  };

  return (
    <section className="todo-container">
      <TodoForm
        addTodo={addTodo}
        checkAll={checkAll}
        isCheckAll={isCheckAll}
        canRenderIconCheckAll={list.length > 0}
      />

      <TodoList
        list={filterList(list, filterStatus)}
        deleteItem={deleteById}
        tickABox={tickBox}
      />
      <Footer
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        itemLeft={filterList(list, "Activated").length}
        canRender={list.length > 0}
      />
    </section>
  );
}
