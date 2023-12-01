import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user = { login: '', password: '' };
  errorMessage: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const loggedInUser = this.authService.logIn(this.user);
    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
      return loggedInUser;
    } else {
      this.user = { login: '', password: '' };
      this.errorMessage = 'Utilisateur inconnu';
    }
  }
}