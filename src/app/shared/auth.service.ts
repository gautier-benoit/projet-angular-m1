import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;
  currentUser = {} as { login: string; password: string; role: string; }

  users = [
    { login: 'user1', password: 'pass1', role: 'user' },
    { login: 'admin', password: 'adminpass', role: 'admin' },
  ];

  logIn(user: { login: string; password: string; } | undefined) {
    if (user) {
      const foundUser = this.users.find(u => u.login === user.login && u.password === user.password);
      if (foundUser) {
        this.loggedIn = true;
        this.currentUser = foundUser;
      }
    }
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = {} as { login: string; password: string; role: string; }
  }


  isLogged() {
    return this.loggedIn;
  }

  isAdmin() {
    return this.loggedIn && this.currentUser && this.currentUser.role === 'admin';
  }

  constructor() { }
}
