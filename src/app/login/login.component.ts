import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  cred!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  subscription!: Subscription;

  @Output() ev = new EventEmitter<any>();

  constructor(
    private service: ServiceService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = new FormControl();
    this.password = new FormControl();
    this.cred = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  login(cred: any): void {
    this.subscription = this.auth.postLogin(cred.value).subscribe({
      next: (res: any) => {
        this.auth.isLogged().subscribe({
          next: (val) => {
            val.isLogged = true;
            this.ev.emit({ isLogged: val.isLogged, decode: val.decode });
          },
        });
        this.router.navigate(['/home']);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
