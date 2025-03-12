export interface Config{
    key: string;
    value: string;
}

export interface OptionMenu{
    url: string;
    title: string;
    action?: () => void;
    icon?: string;
}

export interface OptionSelect{
    code: string;
    name: string;
}


export interface ValidatorException{
    id: string;
    description: string;
}