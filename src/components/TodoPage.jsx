import React, { useState, useEffect } from "react";
import { FaPlusSquare, FaCheck } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodos,
} from "../features/todos/todoSlice";
import { useDispatch } from "react-redux";
function TodoPage() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const [allTodos, setTodos] = useState([]);
  const [change, setChange] = useState(false);
  const [complete, setComplete] = useState(false);
  let filter = "";

  // get all todos
  useEffect(() => {
    dispatch(getTodos(filter)).then((response) => {
      setTodos(response.payload.data);
    });
    setComplete(false);
  }, [change, complete]);

  // add todo
  const addTodoData = () => {
    dispatch(addTodo(todoName)).then((response) => {
      if (response.error) {
        alert("already exist");
      } else {
        setTodos([...allTodos, response.payload.data]);
        setTodoName("");
      }
    });
  };

  // remove todo
  const removeTodo = (id) => {
    dispatch(deleteTodo(id)).then((response) => {
      const temp = allTodos;
      const filtered = temp.filter((item) => {
        return item._id != response.payload.data._id;
      });
      setTodos(filtered);
    });
  };
  // complete todo
  const todoCheck = (id) => {
    dispatch(completeTodo(id)).then((response) => {
      setComplete(true);
    });
  };
  const completed = () => {
    setChange(false);
    filter = "?filter=completed";
    dispatch(getTodos(filter)).then((response) => {
      setTodos(response.payload.data);
    });
  };
  const pending = () => {
    setChange(false);
    filter = "?filter=pending";
    dispatch(getTodos(filter)).then((response) => {
      setTodos(response.payload.data);
    });
  };
  return (
    <>
      <div className="wrapper">
        <header>Todo App</header>
        <div className="inputField">
          <input
            type="text"
            placeholder="Add your todo item"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          {todoName.length ? (
            <FaPlusSquare className="add" onClick={addTodoData} />
          ) : (
            <FaPlusSquare
              className="add"
              onClick={() => alert("input field empty")}
            />
          )}
        </div>
        <ul className="todoList">
          {allTodos.map((todo) => {
            return (
              <li>
                {todo.name}
                {!todo.completed ? (
                  <span className="tick">
                    <FaCheck onClick={() => todoCheck(todo._id)} />
                  </span>
                ) : (
                  <span className="done">
                    <IoCheckmarkDoneCircleOutline />
                  </span>
                )}
                <span className="delete">
                  <AiFillDelete onClick={() => removeTodo(todo._id)} />
                </span>
              </li>
            );
          })}
        </ul>
        <div className="footer">
          <button onClick={completed}>Completed</button>
          <button onClick={pending}>Pending</button>
          <button onClick={() => setChange(true)}>All</button>
        </div>
      </div>
    </>
  );
}

export default TodoPage;
