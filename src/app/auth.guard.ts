import { CanActivateFn,Router} from '@angular/router';

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiurl = 'https://localhost:7229/api/RegistrationAPI';

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void{
    this.http.post(`${this.apiurl}/logout` , {}).subscribe({
      next: () => {
        this.clearSession();
      },
      error: () => {
        this.clearSession();
      }
    });
  }

  private clearSession(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);

  }
}
