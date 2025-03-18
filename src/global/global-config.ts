export class GlobalConfig {
    private static instance: GlobalConfig;
    public readonly apiUrl: string;
    public readonly authUrl: string;
    
    private constructor() {
        this.apiUrl = 'https://miia.comtor.net/miiaapi';
        this.authUrl = 'https://equal-katydid-harmless.ngrok-free.app';
    }
    
    public static getInstance(): GlobalConfig {
        if (!GlobalConfig.instance) {
            GlobalConfig.instance = new GlobalConfig();
        }
        return GlobalConfig.instance;
    }
}
GlobalConfig.getInstance();