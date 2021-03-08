import { authHeader } from '../_helpers';
 import {config} from '../config/config'
import axios from 'axios';
export const userService = {
    login,
    sign_up,
    get_all_users,
    locationShare,
    dashboard,
    public_location
       

};
var configheaders = {
    headers: authHeader()
    }
function sign_up(params) {
    let url =  `${config.userApi}/users/sign_up`;
    return axios.post(url,params,configheaders)
}

function login(params) {
    let url =  `${config.userApi}/users/login`;
    return axios.post(url,params,configheaders)
}

function get_all_users() {
    let url =  `${config.userApi}/users/all_users`;
    return axios.get(url,configheaders)

}

function locationShare(params) {
    let url =  `${config.userApi}/users/create_user_location_share`;
    return axios.post(url,params,configheaders)

}

function dashboard() {
    let url =  `${config.userApi}/users/dashboard`;
    return axios.get(url,configheaders)

}

function public_location(userId) {
    let url =  `${config.userApi}/users/${userId}/public_location`;
    return axios.get(url,configheaders)

}
