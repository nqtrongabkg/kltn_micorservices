import httpAxios from '../httpAxios';

const UserService = {
    login: (user) => {
        return httpAxios.post(`user-services/api/users/token`, user);
    },
    loginAdmin: (user) => {
        return httpAxios.post(`user-services/api/users/token`, user);
    },
    getUserById: (id) => {
        return httpAxios.get(`user-services/api/users/get-by-id/${id}`);
    },
    getCustomer: () => {
        return httpAxios.get(`user-services/api/users/get-customers`);
    },
    getStaffs: () => {
        return httpAxios.get(`user-services/api/users/get-staffs`);
    },
    createCustomer: (userData, avatar) => {
        const formData = new FormData();
        formData.append('userRequest', new Blob([JSON.stringify(userData)], {
            type: "application/json"
        }));
        formData.append('avatar', avatar);
        return httpAxios.post(`user-services/api/users/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    },
    sitchStatus: (id) => {
        return httpAxios.put(`user-services/api/users/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`user-services/api/users/trash/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`user-services/api/users/delete/${id}`);
    },
    update: (id, user, avatar) => {
        const formData = new FormData();
        formData.append('userRequest', new Blob([JSON.stringify(user)], {
            type: "application/json"
        }));
        if (avatar) {
            formData.append('avatar', avatar);
        }
    
        return httpAxios.put(`user-services/api/users/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    },
    
}
export default UserService;
