import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  titre = 'Application de gestion de devoirs';
  nomProf = 'Gautier BENOIT';
  x = 3;
  opened = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/login']);
    } else if (this.authService.loggedIn) {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
