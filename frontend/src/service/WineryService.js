import axiosInstance from "./axios";

const WineryService = {

    getAllWineries: () => axiosInstance.get("/wineries"),


    getWineryById: (id) => axiosInstance.get(`/wineries/${id}`),


    searchWineriesByName: (name) =>
        axiosInstance.get("/wineries/search", { params: { name } }),


    searchWineriesByLocation: (location) =>
        axiosInstance.get("/wineries/search", { params: { location } }),

    
    updateWinery: (id, wineryData) =>
        axiosInstance.put(`/wineries/update/${id}`, wineryData),


    deleteWinery: (id) => axiosInstance.delete(`/wineries/delete/${id}`),
};

export default WineryService;
