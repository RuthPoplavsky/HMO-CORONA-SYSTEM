import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const memberService = {
    getAllMembers: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/member`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    getMemberById: async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/member/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    addMember: async (newMemberData) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/member`, newMemberData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    },
    updateMember: async (id, updatedMemberData) => {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/member/${id}`, updatedMemberData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    deleteMember: async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/member/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export default memberService;
