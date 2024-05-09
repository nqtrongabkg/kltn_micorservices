import httpAxios from '../httpAxios';

const BannerService = {

    create: (brandData) => {
        return httpAxios.post(`order-services/api/orders/create`, brandData);
    },
    getById: (id) => {
        return httpAxios.get(`order-services/api/orders/get-by-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`order-services/api/orders/get-all`);
    },
    update: (id, brand) => { 
        return httpAxios.put(`order-services/api/orders/update/${id}`, brand);
    },
    sitchStatus: (id) => {
        return httpAxios.put(`order-services/api/orders/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`order-services/api/orders/trash/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`order-services/api/orders/delete/${id}`);
    },
    getCard: (id) => {
        return httpAxios.get(`order-services/api/orders/get-card/${id}`);
    },
};

export default BannerService;
