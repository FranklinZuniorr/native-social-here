import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api-social-here.netlify.app/api/',
});
