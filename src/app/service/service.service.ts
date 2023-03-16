import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  provideHeader(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return httpOptions;
  }

  getUserPosts(): Observable<any> {
    return this.http.get<any>(
      'https://letterv2api.onrender.com/test/posts',
      this.provideHeader()
    );
  }

  createPost(post: any): Observable<any> {
    return this.http
      .post(
        'https://letterv2api.onrender.com/test/post',
        post,
        this.provideHeader()
      )
      .pipe(tap((el) => console.log(el)));
  }

  getUserPostsById(id: any): Observable<any> {
    return this.http.get(
      `https://letterv2api.onrender.com/test/post/${id}`,
      this.provideHeader()
    );
  }
  deleteAll(): Observable<any> {
    return this.http.delete(
      'https://letterv2api.onrender.com/test/post',
      this.provideHeader()
    );
  }

  testServer(): Observable<any> {
    return this.http.get('https://letterv2api.onrender.com/test/server');
  }
}
