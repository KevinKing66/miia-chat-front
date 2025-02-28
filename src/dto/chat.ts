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