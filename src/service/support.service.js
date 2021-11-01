import axios from 'axios';
import { config } from './config';

export const supportFormSubmission = (message) => {
    return axios.post(config.baseUrl + `/support`, { message: message });
}

export const aboutFormSubmission = (email, message) => {
    return axios.post(config.baseUrl + `/support`, { email: email, message: message });
}