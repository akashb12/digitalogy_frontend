import axios, { AxiosResponse } from "axios";

export const axiosRequest = axios.create({
  baseURL: "http://localhost:5000/todos",
  headers: {
    ["Content-Type"]: "application/json",
  },
});

export const extractStandardResponseData = (res) => res.data;
