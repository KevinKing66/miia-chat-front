import { AuthResponse, Message } from '../dto/chat';

export class SessionStatus{
  private static instance: SessionStatus;
  private constructor(){

  }

  static getInstance(): SessionStatus{
    if (!SessionStatus.instance){
      SessionStatus.instance = new SessionStatus();
    }
    return SessionStatus.instance;
  }

  getCredentials(): AuthResponse{
    let credentials: AuthResponse = JSON.parse(sessionStorage.credentials);
    return credentials;
  }

  setCredentials(credentials: AuthResponse): void{
    sessionStorage.credentials = JSON.stringify(credentials);
  }

  removeSession(): void{
    sessionStorage.removeItem('credentials');
  }
}
