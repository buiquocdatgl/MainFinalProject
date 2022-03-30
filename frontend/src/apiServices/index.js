import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.101.9:11000/api",
  validateStatus: (status) => status <= 500,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((request) => {
  return request;
});

export const getProduct = () => apiInstance.get("/product/");
