import { AuthResponse, Message } from '../dto/chat';

export class SessionStatus{
  static getCredentials(): AuthResponse{
    let credentials: AuthResponse = JSON.parse(sessionStorage.credentials);
    return credentials;
  }
}
