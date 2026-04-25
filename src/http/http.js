import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";

const http = axios.create({
    baseURL: "https://www.demo.com",
    timeout: 5000,
});

export default http;
