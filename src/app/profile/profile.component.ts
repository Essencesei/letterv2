import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  posts: any = [];

  subscription!: Subscription;

  constructor(private service: ServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.service
      .getUserPostsById(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (val) => {
          this.posts = val.data;
        },
      });
  }
  deleteAll() {
    this.subscription = this.service.deleteAll().subscribe();
    // this.subscription.unsubscribe();
    this.subscription = this.service
      .getUserPostsById(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (val) => {
          this.posts = val.data;
        },
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
