import http from "./axiosApi";

const getAll = () => {
    return http.get("product");
};

const get = id => {
    return http.get(`/product/${id}`);
};

const create = data => {
    return http.post("/product", data);
};

const update = (id, data) => {
    return http.put(`/product/${id}`, data);
};

const remove = id => {
    return http.delete(`/product/${id}`);
};

const get4productFor5cate = () => {
    return http.get(`/product/product4/for5cate`);
};

const searchKey = (key) => {
    return http.get(`/product/search/${key}`);
};

const searchOrder = (key) => {
    return http.get(`/product/searchOrder/${key}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    get4productFor5cate,
    searchKey,
    searchOrder,
};