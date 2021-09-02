import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { axiosRequest } from "../../axios/axios";
export const getTodos = createAsyncThunk("todos/getTodos", async (filter) => {
  const todos = await axiosRequest
    .get(`/getTodos${filter}`)
    .then((res) => res.data);
  return todos;
});
export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const todos = await axiosRequest
    .post("/addTodo", { name: todo })
    .then((res) => res.data);
  return todos;
});
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const todos = await axiosRequest
    .delete(`/deleteTodo/${id}`)
    .then((res) => res.data);
  return todos;
});
export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async (id) => {
    const todos = await axiosRequest
      .patch(`/completeTodo/${id}`)
      .then((res) => res.data);
    return todos;
  }
);
export const todoAdapter = createEntityAdapter();
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    allTodos: {},
    todo: {},
    deletedTodo: {},
    completedTodo: {},
  },
  reducers: {},
  extraReducers: {
    [getTodos.fulfilled]: (state, { payload }) => {
      state.allTodos = payload;
    },
    [addTodo.fulfilled]: (state, { payload }) => {
      state.todo = payload;
    },
    [deleteTodo.fulfilled]: (state, { payload }) => {
      state.deletedTodo = payload;
    },
    [completeTodo.fulfilled]: (state, { payload }) => {
      state.completedTodo = payload;
    },
  },
});
export default todoSlice.reducer;
