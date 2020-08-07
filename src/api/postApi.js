import http from "./axiosApi";


const getAllPost = () => {
    return http.get("/post");
};
const getAllPostStatus2 = () => {
    return http.get("/post/allStatus2");
};

const removePost = id => {
    return http.delete(`/post/${id}`);
};

const getPost = id => {
    return http.get(`/post/one/${id}`);
};
const updatePost = (id, data) => {
    return http.put(`/post/${id}`, data);
};

const createPost = data => {
    return http.post("/post", data);
};


const getAllPostOfCate = (id) => {
    return http.get("/post/cate/"+id);
};

const getPostRandomAll = () => {
    return http.get("/post/get-post-ramdom/");
};
const getPostRanDom = (id) => {
    return http.get("/post/getPostRanDom/"+id);
};
const getPostOfCateRanDom = (id,number) => {
    return http.get(`/post/getPostOfCateRanDom/${id}/${number}`);
};

const searchOrder = (key) => {
    return http.get(`/post/searchOrder/${key}`);
};

const searchKey = (key) => {
    return http.get(`/post/search/${key}`);
};
export default {
    getAllPost,
    getAllPostOfCate,
    getPost,
    updatePost,
    createPost,
    removePost,
    searchOrder,
    searchKey,
    getPostRanDom,
    getPostOfCateRanDom,
    getPostRandomAll,
    getAllPostStatus2
};