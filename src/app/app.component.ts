import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './service/auth.service';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'letterv2';
  loaded: boolean = false;
  isLogged: boolean = false;
  subscibtion!: Subscription;
  interval: any;

  constructor(private service: ServiceService, private auth: AuthService) {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.subscibtion = this.service.testServer().subscribe({
        next: (res: any) => {
          if (res.statusCode === 200 && res.status === 'ok') this.loaded = true;
          clearInterval(this.interval);
          this.subscibtion.unsubscribe();
        },
      });
    }, 1000);

    this.subscibtion = this.auth.isLogged().subscribe({
      next: (val) => {
        this.isLogged = val.isLogged;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscibtion.unsubscribe();
    clearInterval(this.interval);
  }
}
