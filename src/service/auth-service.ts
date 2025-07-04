import axios, { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { GlobalConfig } from '../global/global-config';
import { SessionStatus } from '../session/session-status';

export class AuthService{
    base_url: string;
    headers: CustomHeaders;
    constructor(){
        this.base_url  = GlobalConfig.getInstance().authUrl;
        this.headers = {
            AixabotCustomer : SessionStatus.getInstance().getAixabotCustomer()
        }
    }

    public findCredential(callback: (response: AxiosResponse<any, any>) => void, onError: (error: Error) => void) {
        const customer = SessionStatus.getInstance().getAixabotCustomer();
        axios.get(this.base_url + "/user-info", {headers: this.headers}).then((response) => {
            callback(response);
        }).catch((error: Error) => {
            onError(error);
        });
    }

}

export type CustomHeaders = {
    AixabotCustomer: string
    "Content-Type"?: string;
}