import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://159.65.96.86:8080/services/auth/signin';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    
    const requestBody = {
      username: username,
      password: password
    };
    return this.http.post(this.authUrl, requestBody).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); 
    if (token) {
      return true; 
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token de localStorage
  }
}


