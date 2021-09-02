import { configureStore } from "@reduxjs/toolkit";
import todoList from "../features/todos/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoList,
  },
});

export default store;
