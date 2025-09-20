import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from './services/product-details';
import { Product } from '../../core/interfaces/product';
import { Cart as CartService } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetails);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id: string | null = null;
  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        console.log('Product ID:', this.id);
        if (this.id) {
          this.getProductDetailsData();
        }
      },
    });
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductDetailsData(): void {
    if (!this.id) {
      console.error('No product ID provided');
      return;
    }

    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        console.log('Product details response:', res);
        if (res && res.data) {
          this.productDetails = res.data;
          console.log('Product details loaded:', this.productDetails);
        } else {
          console.error('Invalid response structure:', res);
        }
      },
      error: (err) => {
        console.error('Error loading product details:', err);
      },
    });
  }
}
