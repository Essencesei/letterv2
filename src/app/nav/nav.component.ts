import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  userInfo: any;
  isLogged!: Boolean;
  name: any;

  constructor(
    private service: ServiceService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.auth.isLogged().subscribe({
      next: (val) => {
        console.log(val);
        this.isLogged = val.isLogged;
        this.userInfo = val.decode;
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.subscription = this.auth.isLogged().subscribe({
      next: (val) => {
        console.log(val);
        this.isLogged = val.isLogged;
        this.userInfo = val.decode;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
