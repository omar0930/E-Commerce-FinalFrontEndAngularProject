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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  isLoading: boolean = false;
  errorMsg: string = '';
  flag: boolean = true;

  constructor(private auth: Auth, private router: Router) {}

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'),
      ]),
    },

    { validators: (ctrl) => this.confirmPassword(ctrl) }
  );

  submit() {
    if (this.registerForm.valid) {
      console.log('registerForm value:', this.registerForm.value);

      this.isLoading = true;

      this.auth.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // TODO: navigate / show toast
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          // TODO: surface error to user
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password !== rePassword ? { misMatch: true } : null;
  }
}
