import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Brands as BrandsService } from '../../core/services/brands';
import { Products as ProductsService } from '../../core/services/products';
import { Brand } from '../../core/interfaces/product';
import { Product } from '../../core/interfaces/product';
import { Cart as CartService } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  private readonly brandsService = inject(BrandsService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  brandsList: Brand[] = [];
  productsList: Product[] = [];
  selectedBrand: Brand | null = null;
  isLoadingBrands = true;
  isLoadingProducts = false;
  brandsError = '';
  productsError = '';

  ngOnInit(): void {
    this.loadBrands();
  }

  // Load all brands from API
  private loadBrands(): void {
    this.isLoadingBrands = true;
    this.brandsError = '';

    this.brandsService.getBrands().subscribe({
      next: (response) => {
        this.brandsList = response.data || response;
        this.isLoadingBrands = false;
      },
      error: (error) => {
        console.error('Error loading brands:', error);
        this.brandsError = 'Failed to load brands. Please try again.';
        this.isLoadingBrands = false;
      },
    });
  }

  // Handle brand selection and load products for selected brand
  onBrandSelect(brand: Brand): void {
    this.selectedBrand = brand;
    this.productsList = [];
    this.isLoadingProducts = true;
    this.productsError = '';

    this.productsService.getProductsByBrand(brand._id).subscribe({
      next: (response) => {
        this.productsList = response.data || response;
        this.isLoadingProducts = false;
      },
      error: (error) => {
        console.error('Error loading products for brand:', error);
        this.productsError =
          'Failed to load products for this brand. Please try again.';
        this.isLoadingProducts = false;
      },
    });
  }

  // Clear selection and show all brands
  clearSelection(): void {
    this.selectedBrand = null;
    this.productsList = [];
    this.productsError = '';
  }

  // add to cart - Add product to cart
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
}
