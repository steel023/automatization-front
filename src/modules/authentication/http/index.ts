import {AxiosResponse} from 'axios'
import $api from "../../../http";
import {AuthResponse} from "../../../models/AuthResponse";

export function login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/login', {
        email: email,
        password: password,
    })
}

export function register(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/register', {
        email: email,
        password: password,
    })
}