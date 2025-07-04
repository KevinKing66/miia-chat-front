export interface MessageDto {
    to_user_code: string;
    to_user_name?: string;
    from_user_code: string;
    from_user_name?: string;
    chatbot_code: 'SOFI' | 'COMTOR';
    message: string; 
    sent_timestamp: string;
}

// export interface ReplyDTO{
//     to_user_code: string;
//     to_user_name: string;
//     message: string;
//     chatbot_code: string;
//     sent_timestamp: string;
// }
export interface ReplyDTO {
    answer: string;
    content_subtype?: string | null;
    content_type?: string | null;
    from_user_code?: string | null;
    from_user_name?: string | null;
    remote_chat_id?: string | null;
    sent_timestamp?: string | null;
    to_user_code?: string | null;
    to_user_id?: string | null;
    to_user_name?: string | null;
    token?: string;
    whatsapp_business_account_id?: string | null;
    whatsapp_phone_number_id?: string | null;
  }
  

export class Message {
    constructor(public text: string, public type: 'BOT' | 'USER') { }
}

export interface AuthResponse {
    access_token?: string;
    expires_at?: number;
    expires_in?: number;
    id_token?: string;
    AixabotCustomer?: string;
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
