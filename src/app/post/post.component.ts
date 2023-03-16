import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  postData!: FormGroup;
  subject!: FormControl;
  body!: FormControl;
  isPublic!: FormControl;
  subscription!: Subscription;
  postedToggle = false;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.subject = new FormControl();
    this.body = new FormControl();
    this.isPublic = new FormControl(false);
    this.postData = new FormGroup({
      subject: this.subject,
      body: this.body,
      isPublic: this.isPublic,
    });
  }

  post(form: any) {
    this.subscription = this.service.createPost(form.value).subscribe();
    this.postData.reset();
    this.postedToggle = true;
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
