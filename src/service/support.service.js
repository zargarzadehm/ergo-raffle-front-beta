import axios from 'axios';
import { config } from './config';

export const supportFormSubmission = (message, response) => {
    return axios.post(config.baseUrl + `/support`, { message: message, recaptcha: response });
}

export const aboutFormSubmission = (email, message, response) => {
    return axios.post(config.baseUrl + `/support`, { email: email, message: message, recaptcha: response });
}