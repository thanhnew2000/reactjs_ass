import http from "./axiosApi";

const getAllCate = () => {
    return http.get("cate");
};

const getCate = id => {
    return http.get(`/cate/${id}`);
};

const createCate = data => {
    return http.post("/cate", data);
};

const updateCate = (id, data) => {
    return http.put(`/cate/${id}`, data);
};

const removeCate = id => {
    return http.delete(`/cate/${id}`);
};


export default {
    getAllCate,
    getCate,
    createCate,
    updateCate,
    removeCate,
};