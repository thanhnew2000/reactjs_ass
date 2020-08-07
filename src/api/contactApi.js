import http from "./axiosApi";

const getAllContact = () => {
    return http.get("/contact");
};

const getContact = id => {
    return http.get(`/contact/${id}`);
};

const createContact = data => {
    return http.post("/contact", data);
};

const updateContact = (id, data) => {
    return http.put(`/contact/${id}`, data);
};

const removeContact = id => {
    return http.delete(`/contact/${id}`);
};

const replyMail = data => {
    return http.post(`/mail/sendbasicemail`, data);
};

export default {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    removeContact,
    replyMail,
};