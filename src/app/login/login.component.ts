import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = "";
  password: string = "";
  public loginValid = true;
  errorMessage: string | undefined;
  loggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((data: boolean) => {
        this.loggedIn = data;
      }
    );
  }

  openDialog() {
    this.matDialog.open(RegisterComponent);
  }

  login() {
    this.authService.postLogin(this.name, this.password).subscribe({
      next: (response) => {
        if (response.message === 'TRUE') {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Une erreur s\'est produite lors de la connexion';
      }
    });
  }
}
