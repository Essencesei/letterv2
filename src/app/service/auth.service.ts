import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLogged(): Observable<any> {
    const token = localStorage.getItem('token');
    let decode: String;
    let isLogged: boolean = false;

    if (token) {
      decode = jwtDecode(token);
      isLogged = true;
    }
    return new Observable((obs) => {
      obs.next({ isLogged, decode });

      obs.complete();
    });
  }

  postLogin(cred: any): Observable<any> {
    return this.http
      .post<any>('https://letterv2api.onrender.com/test/login', cred)
      .pipe(
        tap((el) => {
          localStorage.setItem('token', el.data.token);
        })
      );
  }
}
