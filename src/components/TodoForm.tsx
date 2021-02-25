import React, { useEffect, useRef } from "react";
import "../styles/TodoForm.css";

interface IFormProp {
  addTodo: (description: string) => void;
  checkAll: () => void;
  isCheckAll: boolean;
  canRenderIconCheckAll:boolean
}
export default React.memo(function TodoForm(props: IFormProp) {
  const { addTodo, checkAll, isCheckAll,canRenderIconCheckAll } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="d-flex align-center header">
      <input
        type="checkbox"
        id="checkAll"
        checked={isCheckAll}
        onChange={() => {}}
      />
      <label htmlFor="checkAll" className={`checkAll ${!canRenderIconCheckAll &&"icon-check-all-disable"}`} onClick={checkAll}></label>
      <input
        className="input-field"
        placeholder="Todo List"
        ref={inputRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            let value = (e.target as HTMLInputElement).value.trim();
            if (value !== "") addTodo(value);

            if (inputRef.current) inputRef.current.value = "";
          }
        }}
      />
    </div>
  );
});
