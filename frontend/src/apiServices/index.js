import axios from "axios";
import {REACT_APP_API} from '../../APIUrl'

const apiInstance = axios.create({
  baseURL: `${REACT_APP_API}`,
  validateStatus: (status) => status <= 500,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((request) => {
  return request;
});

export const getProduct = () => apiInstance.get("/product/");

export const getOrder = (id) => apiInstance.get(`/orders/${id}`);
