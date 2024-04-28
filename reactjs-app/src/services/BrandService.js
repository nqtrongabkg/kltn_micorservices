import httpAxios from '../httpAxios';

const BrandService = {
    create: (brandData) => {
        return httpAxios.post(`product-services/api/brands/create`, brandData);
    },
    uploadImage: (id, image) => {
        const formData = new FormData();
        formData.append('image', image);
        return httpAxios.post(`product-services/api/brands/image/${id}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    },
    
    getById: (id) => {
        return httpAxios.get(`product-services/api/brands/get-by-id/${id}`);
    },
    getByUser: (userId) => {
        return httpAxios.get(`product-services/api/brands/get-by-user/${userId}`);
    },
    getAll: () => {
        return httpAxios.get(`product-services/api/brands/get-all`);
    },
    update: (id, brand, image) => {
        const formData = new FormData();
        formData.append('brandRequest', new Blob([JSON.stringify(brand)], {
            type: "application/json"
        }));
        if (image) {
            formData.append('image', image);
        }
    
        return httpAxios.put(`product-services/api/brands/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    },
    sitchStatus: (id) => {
        return httpAxios.put(`product-services/api/brands/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`product-services/api/brands/trash/${id}`);
    },
    display: (id) => {
        return httpAxios.put(`product-services/api/brands/display/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`product-services/api/brands/delete/${id}`);
    },
}
export default BrandService;
