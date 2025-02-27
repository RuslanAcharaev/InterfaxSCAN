import api from "../api/index.js";

export const searchService = {
    async search(searchParams){
        try {
            const response = await api.post('/objectsearch/histograms', searchParams);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Ошибка запроса данных");
        }
    },

    async getIds(searchParams){
        try {
            const response = await api.post('/objectsearch', searchParams);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Ошибка запроса ID публикаций");
        }
    },

    async getDocuments(requestData){
        try {
            const response = await api.post('/documents', requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Ошибка запроса публикаций");
        }
    }
}