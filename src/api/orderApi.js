import http from "./axiosApi";


const getAllOrder = () => {
    return http.get("/order");
};

const getAllOrderUser = (id) => {
    return http.get("/order/user/"+id);
};

const createOrder = (id,totalprice,data,) => {
    return http.post(`/order/`+id+`/${totalprice}`, data);
};
const getOne = id => {
    return http.get(`/order/${id}`);
};

const getOrderDetails = (id_order) =>{
    return http.get(`/order/order_detail/${id_order}`);
}
const updateStatus = (id, data) => {
    return http.put(`/order/${id}`, data);
};


const dashBoardTotal = () => {
    return http.get(`/dashboard/total`);
};
export default {
    createOrder,
    getAllOrder,
    getOne,
    getOrderDetails,
    updateStatus,
    getAllOrderUser,
    dashBoardTotal
    
};