import axios from 'axios';
import { config } from './config';

export const getTopRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&sorting=-activity&status=active`)
}
export const getAllYourDonations = (address, offset, limit) => {
    return axios.get(config.baseUrl + `/wallet/${address}/donation?offset=${offset}&limit=${limit}`)
}
export const postRaffle = (raffleName, address, walletAddress, files, ergGoal, ticketPrice, ticketPercent, deadline, description, recaptcha) => {
    return axios.post(config.baseUrl + `/raffle`, {
        name: raffleName, charity: address, wallet: walletAddress, picture: files,
        goal: ergGoal, ticketPrice: ticketPrice, charityPercent: ticketPercent, deadline: deadline, description: description, recaptcha: recaptcha
    })
}
export const getAllYourRafflesYouWin = (address, offset, limit) => {
    return axios.get(config.baseUrl + `/wallet/${address}/win?limit=${limit}&offset=${offset}`)
}
export const donateRaffle = (id, walletAddr, ticketCounts, recaptcha) => {
    return axios.post(config.baseUrl + `/raffle/${id}/donate`, { walletAddr: walletAddr, ticketCounts: ticketCounts, recaptcha: recaptcha })
}
export const getYourActiveRaffleTickets = (id, wallet) => {
    return axios.get(config.baseUrl + `/raffle/${id}/address/${wallet}/donation`)
}
export const getNearDeadlineRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&sorting=-deadline&status=active`)
}
export const getLatestRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&sorting=-createTime&status=active`)
}
export const getSucceedRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&status=succeed`)
}
export const getFailedRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&status=failed`)
}
export const getActiveRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&status=active`)
}
export const getAllRaffle = (offset, limit) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&status=all`)
}
export const getRafflesByState = (offset, limit, status) => {
    return axios.get(config.baseUrl + `/raffle?offset=${offset}&limit=${limit}&status=${status}`)
}
export const getSingleRaffle = (id) => {
    return axios.get(config.baseUrl + `/raffle/${id}`)
}
export const getRaffleTransactions = (id, offset, limit) => {
    return axios.get(config.baseUrl + `/raffle/${id}/transaction?limit=${limit}&offset=${offset}`);
}
export const getRaffleDonationStatus = (id, donationId) => {
    return axios.get(config.baseUrl + `/raffle/${id}/donate/${donationId}/status`);
}
export const getRaffleStatus = (id) => {
    return axios.get(config.baseUrl + `/raffle/${id}/status`);
}
