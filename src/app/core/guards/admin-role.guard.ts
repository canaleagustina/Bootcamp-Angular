import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const role: string = this.cookieService.get('role');
    if (role === 'admin') {
      return true; // Permite el acceso si el rol es "admin".
    } else {
      this.router.navigate(['/auth/login']); // Redirige a la página de login si el rol no es "admin".
      return false;
    }
  }

  // Nuevo método público para obtener el rol del usuario.
  getRole(): string {
    return this.cookieService.get('role');
  }
}
