import { Http } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

const baseURL = 'http://10.0.2.2:3000/api';

const api = {
    async request(method, endpoint, data = null) {
        try {
            const token = ApplicationSettings.getString('token');
            const headers = {
                'Content-Type': 'application/json'
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const options = {
                url: `${baseURL}${endpoint}`,
                method: method,
                headers: headers
            };

            if (data) {
                options.content = JSON.stringify(data);
            }

            const response = await Http.request(options);
            return JSON.parse(response.content);
        } catch (error) {
            throw error;
        }
    },

    register: (data) => api.request('POST', '/users/register', data),
    login: (data) => api.request('POST', '/users/login', data),
    getTasks: () => api.request('GET', '/tasks'),
    createTask: (data) => api.request('POST', '/tasks', data),
    updateTask: (id, data) => api.request('PUT', `/tasks/${id}`, data),
    deleteTask: (id) => api.request('DELETE', `/tasks/${id}`)
};

export default api;
