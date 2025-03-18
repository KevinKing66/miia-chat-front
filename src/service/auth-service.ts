import axios, { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { GlobalConfig } from '../global/global-config';

export class AuthService{
    base_url: string;
    constructor(){
        console.log("GlobalConfig: ", GlobalConfig);
        this.base_url  = GlobalConfig.getInstance().authUrl;
    }

    public findCredential(callback: (response: AxiosResponse<any, any>) => void, onError: (error: Error) => void) {
        axios.get(this.base_url + "/user-info").then((response) => {
            callback(response);
        }).catch((error: Error) => {
            onError(error);
        });
    }

}