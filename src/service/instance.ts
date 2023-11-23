import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  // baseURL: 'https://stu-war-server.vercel.app/api',
  baseURL: "http://127.0.0.1:7000/api",
  // baseURL: "http://192.168.1.45:7000/api",
});
const token = Cookies.get("token");
instance.defaults.headers.common["Authorization"] = token;

export default instance;
