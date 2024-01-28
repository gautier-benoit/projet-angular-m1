import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AccessType, Users } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser: { login: string; password: string; role: string; } | null = null;
  url = "http://localhost:8010/api";

  private users: { login: string; password: string; role: string; }[] = [];

  constructor(private http: HttpClient) {
    const loginStr = localStorage.getItem('login');
    if (loginStr) {
      const loginData = JSON.parse(loginStr) as ILoginStorage;
      this.loggedIn.next(true);
      if (Array.isArray(loginData.user)) {
        this.users = loginData.user;
      }
    }
    this.checkLocalStorageForCredentials();
  }

  private checkLocalStorageForCredentials() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.loggedIn.next(true);
    }
  }

  // (old) postLogin(login: string, password: string): Observable<{ message: string }> {
  //   const foundUser = this.users.find(u => u.login === login && u.password === password);
  //   if (foundUser) {
  //     this.currentUser = foundUser;
  //     localStorage.setItem('user', JSON.stringify(foundUser));
  //     this.loggedIn.next(true);
  //     return of({ message: 'TRUE' });
  //   } else {
  //     this.loggedIn.next(false);
  //     return of({ message: 'FALSE' });
  //   }
  // }

  postLogin(login: string, password: string): Observable<{ message: string, token?: string }> {
    return this.http.post<{ message: string, token?: string }>(`${this.url}/login`, { login, password }).pipe(
      tap(data => {
        this.handleLogin(data);
      })
    );
  }
  postRegister(login: String, password: String, lastName: string, firstName: string, accessType: AccessType, civility: string): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, { login, password, lastName, firstName, accessType, civility }).pipe(
      tap(data => {
        this.handleLogin(data);
      })
    );
  }

  handleLogin(data: any) {
    if (data.message === "TRUE") {
      const token = data.token;
      const tokenData = token.split('.')[1];
      const decodedTokenData = window.atob(tokenData);
      const decodedTokenJsonData = JSON.parse(decodedTokenData);

      localStorage.setItem('login', JSON.stringify({
        user: decodedTokenJsonData.userData,
        token: token
      }));

      this.users = decodedTokenJsonData.userData;
      this.loggedIn.next(true);
    }
    else {
      this.users = [];
      this.loggedIn.next(false);
    }
  }

  logOut() {
    this.loggedIn.next(false);
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser !== null && this.currentUser.role === 'admin';
  }

}

interface ILoginStorage {
  user: any;
}