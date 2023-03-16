import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  posts: any = [];
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.subscription = this.service
      .getUserPosts()
      .subscribe({ next: (el) => (this.posts = el.data) });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
