import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    validateStatus: (status) => status <= 500,
});

apiInstance.interceptors.request.use((request) => {
    return request;
});

//Product
export const createProduct = (formData) =>
    apiInstance.post("/product/", formData);

export const getProduct = () =>
    apiInstance.get("/product/");

export const getSingleProduct = (id) =>
    apiInstance.get(`/product/${id}`);

export const updateProduct = (id, formData) =>
    apiInstance.put(`/product/${id}`, formData);

export const deleteProduct = (id) =>
    apiInstance.delete(`/product/${id}`);