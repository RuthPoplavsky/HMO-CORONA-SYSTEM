import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const coronaDataService = {

    getAllCoronaData: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/corona-data`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    getCoronaDataByMemberId: async (memberId) => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/corona-data/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    addCoronaData: async (coronaData) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/corona-data`, coronaData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    updateCoronaData: async (memberId, updatedCoronaData) => {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/corona-data/${memberId}`, updatedCoronaData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    deleteCoronaData: async (memberId) => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/corona-data/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    ,
    getCountActivePatientsLastMonth: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/corona-data/count-active-patients-last-month`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    getCountNotVaccinatedMembers: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/corona-data/count-vaccinated-members`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },


};
export default coronaDataService;
