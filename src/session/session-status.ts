
// export class SessionStatus{
//     private static instance: SessionStatus;
    
//     public static SESSION = "SESSION"
    
//     public token: string | null;

//     // Private constructor prevents instantiation from outside the class
//     private constructor() {
//         this.token = null;
//         let session = localStorage.getItem(SessionStatus.SESSION);
//         if (session){
//             this.token = JSON.parse(session).token;
//         }
//     }

//     // Method to get the singleton instance
//     public static getInstance(): SessionStatus {
//         if (!SessionStatus.instance) {
//             SessionStatus.instance = new SessionStatus();
//         }
//         return SessionStatus.instance;
//     }    

//     public getUser(){
//         let session = localStorage.getItem("SESSION");
//         if(session){
//             return JSON.parse(session).user;
//         }
//         return null;
//     }

//     public checkToken(){
//         if (!this.token){
//             this.token = null;
//             window.location.href = '/login';
//             return;
//         }
//         new MiiaLoginService().validateToken(this.token, (data) => this.callback(data), (error) => this.onError(error));
        
//     }

//     protected callback(response){
//         let data = response.data;

//         if(!data.ok){
//             this.token = null;
//             window.location.href = '/login';
//             localStorage.removeItem(SessionStatus.SESSION);
//         }
//     }

//     protected onError(error){
//         localStorage.removeItem(SessionStatus.SESSION);
//         this.token = null;
//         window.location.href = '/login';
//     }

//     public removeSession(){
//         localStorage.removeItem(SessionStatus.SESSION);
//         this.token = null;
//         window.location.href = '/login';
//     }
// }
