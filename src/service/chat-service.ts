import axios, { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { GlobalConfig } from '../global/global-config';
import { MessageDto } from '../dto/chat';
import { SessionStatus } from '../session/session-status';
import { CustomHeaders } from './auth-service';


export class ChatService {
    private static instance: ChatService;
    header: CustomHeaders;

    private constructor(){
        this.header = { 
            "Content-Type": "application/json",
            AixabotCustomer : SessionStatus.getInstance().getAixabotCustomer()
        }
    }

    public static getInstance(): ChatService{
        if (!ChatService.instance){
            ChatService.instance = new ChatService();
        }

        return ChatService.instance;
    }
    // static BASE_URL = GlobalConfig.getInstance().apiUrl;

    public sendMessages(body: MessageDto, callback: (response: AxiosResponse<any, any>) => void, onError: (error: Error) => void, finallyFn: () => void) {
        let config = {
            headers: this.header
        };
        axios.post(`${GlobalConfig.getInstance().apiUrl}/chatbot-web/`, body, config)
            .then(response => {
                callback(response);
            })
            .catch(error => {
                onError(error);
            })
            .finally(() => {
                finallyFn();
            });
    }
}