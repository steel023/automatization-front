import {login, register} from '../http'
import {AxiosError, AxiosResponse} from 'axios'
import {AuthResponse} from "../../../models/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<number> {
        let err: (AxiosError | null) = null;
        let loginResponse: (AxiosResponse<AuthResponse> | null) = null;

        try {
            loginResponse = await login(email, password);
        } catch (e: any) {
            err = e;
        }

        if (err != null) {
            if (err.response) {
                return err.response.status;
            }

            return 0;
        }

        if (loginResponse && loginResponse?.status != 200) {
            return loginResponse!.status;
        }

        if (!loginResponse) {
            return 0;
        }

        if (!loginResponse.data.access_token && !loginResponse.data.refresh_token && loginResponse.status == 200) {
            return 204;
        }

        localStorage.setItem("access_token", loginResponse!.data.access_token)
        localStorage.setItem("refresh_token", loginResponse!.data.refresh_token)
        localStorage.setItem("expires_at", loginResponse!.data.expires_at)
        localStorage.setItem("user", JSON.stringify(loginResponse!.data.user))

        return 200;
    }

    static async register(email: string, password: string): Promise<number> {
        let err: (AxiosError | null) = null;
        let registerResponse: (AxiosResponse<AuthResponse> | null) = null;

        try {
            registerResponse = await register(email, password);
        } catch (e: any) {
            err = e;
        }

        if (err != null) {
            if (err.response) {
                return err.response.status;
            }

            return 0;
        }

        localStorage.setItem("access_token", registerResponse!.data.access_token)
        localStorage.setItem("refresh_token", registerResponse!.data.refresh_token)
        localStorage.setItem("expires_at", registerResponse!.data.expires_at)
        localStorage.setItem("user", JSON.stringify(registerResponse!.data.user))

        return 200;
    }
}