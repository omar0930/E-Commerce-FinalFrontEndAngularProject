import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLoading: boolean = false;
  errorMsg: string = '';
  subscription: Subscription = new Subscription();

  constructor(
    private auth: Auth,
    private router: Router,
    private cookieService: CookieService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submit() {
    if (this.loginForm.valid) {
      console.log('loginForm value:', this.loginForm.value);

      this.isLoading = true;
      this.subscription.unsubscribe();

      this.subscription = this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // TODO: navigate / show toast
          this.isLoading = false;
          this.cookieService.set('token', response.token);

          this.auth.decodeToken();

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          // TODO: surface error to user
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  confirmPassword(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password !== rePassword ? { misMatch: true } : null;
  }
}
