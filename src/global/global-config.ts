// global-config.ts

export class GlobalConfig {
    private static instance: GlobalConfig;
    public readonly apiUrl: string;
    public readonly authUrl: string;
    // public readonly ngrok_url: string = "https://equal-katydid-harmless.ngrok-free.app";
    // public readonly miia_url: string = "https://miia.comtor.net/miiaapi/chatbot-web/";
    

    // Private constructor prevents instantiation from outside the class
    private constructor() {
        this.apiUrl = 'https://miia.comtor.net/miiaapi';
        this.authUrl = 'https://equal-katydid-harmless.ngrok-free.app';
    }

    // Method to get the singleton instance
    public static getInstance(): GlobalConfig {
        if (!GlobalConfig.instance) {
            GlobalConfig.instance = new GlobalConfig();
        }
        return GlobalConfig.instance;
    }
}

// export default GlobalConfig;