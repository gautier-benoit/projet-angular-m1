import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  // On inject par programme
  let authService = inject(AuthService);
  let router = inject(Router);

  // Si ça renvoie true, alors on peut activer la route
if (authService.isLogged()) {
    console.log("Authentifié, vous êtes autorisé !");
    return true;
  } else if (authService.isAdmin()) {
    console.log("Authentifié et autorisé, vous êtes administrateur !");
    return true;
  } else {
    console.log("Pas autorisé, vous n'êtes pas administrateur !");
    router.navigate(['/home']);
    return false;
  }
};
