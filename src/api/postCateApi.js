import http from "./axiosApi";


const getAllPostCate = () => {
    return http.get("/postCate/");
};

const getAllCateallClient = () => {
    return http.get("/postCate/allClient");
};

const removeCatePost  = id => {
    return http.delete(`/postCate/${id}`);
};
const createCatePost = data => {
    return http.post("/postCate", data);
};
const getOneCate = id => {
    return http.get(`/postCate/${id}`);
};

const updateCatePost = (id, data) => {
    return http.put(`/postCate/${id}`, data);
};
export default {
    getAllPostCate,
    removeCatePost,
    createCatePost,
    getOneCate,
    updateCatePost,
    getAllCateallClient
    
};