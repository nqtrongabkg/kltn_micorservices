import httpAxios from '../httpAxios';

const ProductService = {
    create: (data) => {
        return httpAxios.post(`product-services/api/products/create`, data);
    },
    setImage: (data) => {
        return httpAxios.put(`product-services/api/products/set-image`, data);
    },
    getById: (id) => {
        return httpAxios.get(`product-services/api/products/get-by-id/${id}`);
    },
    getByBrand: (id) => {
        return httpAxios.get(`product-services/api/products/get-by-brand/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`product-services/api/products/get-all`);
    },
    update: (id, data) => { 
        return httpAxios.put(`product-services/api/products/update/${id}`, data);
    },
    sitchStatus: (id) => {
        return httpAxios.put(`product-services/api/products/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`product-services/api/products/trash/${id}`);
    },
    display: (id) => {
        return httpAxios.put(`product-services/api/products/display/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`product-services/api/products/delete/${id}`);
    },
}
export default ProductService;
