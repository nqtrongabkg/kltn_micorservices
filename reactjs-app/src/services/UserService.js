import httpAxios from '../httpAxios';

const UserService = {
    login: (user) => {
        return httpAxios.post(`user-services/api/users/token`, user);
    },
    loginAdmin: (user) => {
        return httpAxios.post(`user-services/api/users/token`, user);
    },
    getUser: (id) => {
        return httpAxios.get(`user-services/api/users/get-by-id/${id}`);
    },
    getProduct: () => {
        return httpAxios.get(`product-services/api/products/get-all`);
    }
};

export default UserService;
