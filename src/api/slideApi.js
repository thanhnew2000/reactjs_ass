import http from "./axiosApi";

const getAllSlide = () => {
    return http.get("/slides");
};

const getOneSlide = (id) => {
    return http.get("/slides/"+id);
};

const updateSlide = (id, data) => {
    return http.put(`/slides/${id}`, data);
};


export default {
    getAllSlide,
    updateSlide,
    getOneSlide

};