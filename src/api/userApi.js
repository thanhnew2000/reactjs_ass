import http from "./axiosApi";

const getAllUsers = () => {
    return http.get("user");
};

const get = id => {
    return http.get(`/user/${id}`);
};

const createUser = data => {
    return http.post("/user", data);
};

const checkLogin = data => {
    return http.post("/user/checklogin", data);
};

const updateUser = (id, data) => {
    return http.put(`/user/${id}`, data);
};
const doiPassword = (id, data) => {
    return http.post(`/user/doimk/${id}`, data);
};

const removeUser = id => {
    return http.delete(`/user/${id}`);
};

export default {
    getAllUsers,
    get,
    createUser,
    checkLogin,
    updateUser,
    doiPassword,
    removeUser

};