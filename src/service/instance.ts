import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:7000/api'
})
const token = Cookies.get('token')
instance.defaults.headers.common['Authorization'] = token;


export default instance 