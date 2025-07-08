import { AuthResponse, Message } from '../dto/chat';

export class SessionStatus{
  private static instance: SessionStatus;
  private static CUSTOMER: string = "customer";
  private constructor(){

  }

  static getInstance(): SessionStatus{
    if (!SessionStatus.instance){
      SessionStatus.instance = new SessionStatus();
    }
    return SessionStatus.instance;
  }

  getCredentials(): AuthResponse{
    let credentials: AuthResponse = sessionStorage.credentials ? JSON.parse(sessionStorage.credentials) : undefined;
    return credentials;
  }

  getAixabotCustomer(): string {
    return SessionStatus.CUSTOMER ? JSON.parse(SessionStatus.CUSTOMER) : undefined;
  }

  setAixabotCustomer(value: string){
    sessionStorage.setItem(SessionStatus.CUSTOMER, value);
  }

  setCredentials(credentials: AuthResponse): void{
    sessionStorage.credentials = JSON.stringify(credentials);
  }

  removeSession(): void{
    sessionStorage.removeItem('credentials');
  }
}
