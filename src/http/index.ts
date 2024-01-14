import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/AuthResponse";

const API_URL = import.meta.env.VITE_BACKEND_URL + "api/v1";

const $api = axios.create();

$api.interceptors.request.use((config) => {
    config.baseURL = API_URL;
    config.withCredentials = true;
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return config;
})

$api.interceptors.response.use((config: AxiosResponse) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (!!error.response && error.response.status === 401 && originalRequest && !originalRequest._isRetry && !originalRequest.url.includes("login")) {
        originalRequest._isRetry = true;

        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("refresh_token")}`
                }
            })

            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem("expires_at", response.data.expires_at);
            localStorage.setItem("user", JSON.stringify(response!.data.user));

            return $api.request(originalRequest);
        } catch (e) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("expires_at");
            localStorage.removeItem("user");
            window.location.reload();
            return;
        }
    }

    return Promise.reject(error);
})

export default $api;