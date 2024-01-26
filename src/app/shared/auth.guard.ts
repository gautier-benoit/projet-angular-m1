import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          console.log("Authentifié, vous êtes autorisé !");
          return true;
        } else {
          console.log("Pas autorisé, vous n'êtes pas administrateur !");
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
