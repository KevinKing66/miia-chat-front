export interface MessageDto{
    to_user_code: string;
    from_user_name?: string;
    chatbot_code: 'SOFI';
    message: string; 
    sent_timestamp: string;
}

export interface ReplyDTO{
    answer: string;
    question: string;
    sent_timestamp: string;
}

export class Message {
    constructor(public text: string, public type: 'BOT' | 'USER') { }
}

export interface AuthResponse {
    access_token?: string;
    expires_at?: number;
    expires_in?: number;
    id_token?: string;
    scope?: string;
    token_type?: string;
    userinfo: UserInfo;
}

export interface UserInfo {
    aud?: string;
    email: string;
    email_verified?: boolean;
    exp?: number;
    iat?: number;
    iss?: string;
    name?: string;
    nickname?: string;
    nonce?: string;
    picture?: string;
    sid?: string;
    sub?: string;
    updated_at?: string;
}
