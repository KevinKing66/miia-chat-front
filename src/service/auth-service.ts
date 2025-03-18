import axios, { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { GlobalConfig } from '../global/global-config';

export class AuthService{
    static BASE_URL = GlobalConfig.getInstance().authUrl;

    public findCredential(callback: (response: AxiosResponse<any, any>) => void, onError: (error: Error) => void) {
        axios.get("AuthService.BASE_URL" + "/user-info").then((response) => {
            callback(response);
        }).catch((error: Error) => {
            onError(error);
        });
    }

}