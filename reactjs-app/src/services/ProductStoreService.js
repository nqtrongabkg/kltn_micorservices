import httpAxios from '../httpAxios';

const ProductStoreService = {
    create: (data) => {
        return httpAxios.post(`store-services/api/product-stores/create`, data);
    },
    import: (data) => {
        return httpAxios.post(`store-services/api/product-imports/create`, data);
    },
    getById: (id) => {
        return httpAxios.get(`store-services/api/product-stores/get-by-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`store-services/api/product-stores/get-all`);
    },
    getImports: () => {
        return httpAxios.get(`store-services/api/product-imports/get-all`);
    },
    update: (id, data) => { 
        return httpAxios.put(`store-services/api/product-stores/update/${id}`, data);
    },
    delete: (id) => {
        return httpAxios.delete(`store-services/api/product-stores/delete/${id}`);
    },
    deleteByOptionValue: (id) => {
        return httpAxios.delete(`store-services/api/product-stores/delete-by-option-value/${id}`);
    },
    getByProductId: (id) => {
        return httpAxios.get(`store-services/api/product-stores/get-by-product/${id}`);
    },
    getbyUserId: (id) => {
        return httpAxios.get(`store-services/api/product-stores/get-by-user/${id}`);
    },
}
export default ProductStoreService;
