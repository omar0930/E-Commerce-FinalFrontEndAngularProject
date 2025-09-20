import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart as CartService } from '../cart/services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly phoneEgPattern = /^01[0125]\d{8}$/;
  private readonly cartService = inject(CartService);

  checkOutForm!: FormGroup;
  id: string | null = null;
  isProcessing = false;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      },
    });
  }

  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(this.phoneEgPattern)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }

  submitForm(): void {
    if (this.checkOutForm.valid) {
      this.cartService
        .checkOutSession(this.id, this.checkOutForm.value)
        .subscribe({
          next: (response) => {
            console.log('Checkout successful:', response);
            if (response.status === 'success') {
              window.open(response.session.url, '_self');
            }
          },
          error: (error) => {
            console.error('Checkout error:', error);
          },
        });
    }
  }

  // convenience getter for easy access to form fields
  get ship() {
    return (this.checkOutForm.get('shippingAddress') as FormGroup).controls as {
      details: any;
      phone: any;
      city: any;
    };
  }

  paymentByCash(): void {
    if (this.checkOutForm.invalid) {
      this.checkOutForm.markAllAsTouched();
      return;
    }
    this.isProcessing = true;

    // Create cash order first, then navigate
    this.cartService
      .createCashOrder(this.id, this.checkOutForm.value)
      .subscribe({
        next: (response) => {
          console.log('Cash order created successfully:', response);
          // Navigate to all orders page after successful order creation
          this.router.navigateByUrl('/allorders');
        },
        error: (error) => {
          console.error('Cash order creation failed:', error);
          // Still navigate to orders page even if there's an error
          this.router.navigateByUrl('/allorders');
        },
        complete: () => {
          this.isProcessing = false;
        },
      });
  }
}
