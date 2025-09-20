import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Categories as CategoriesService } from '../../core/services/categories';
import { Products as ProductsService } from '../../core/services/products';
import { Category } from '../../core/interfaces/category';
import { Product } from '../../core/interfaces/product';
import { Cart as CartService } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  categoriesList: Category[] = [];
  productsList: Product[] = [];
  selectedCategory: Category | null = null;
  isLoadingCategories = true;
  isLoadingProducts = false;
  categoriesError = '';
  productsError = '';

  ngOnInit(): void {
    this.loadCategories();

    // Check if a specific category was requested via query params
    this.route.queryParams.subscribe((params) => {
      if (params['categoryId']) {
        this.loadSpecificCategory(params['categoryId']);
      }
    });
  }

  // Load all categories from API
  private loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoriesError = '';

    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categoriesList = response.data || response;
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.categoriesError = 'Failed to load categories. Please try again.';
        this.isLoadingCategories = false;
      },
    });
  }

  // Load specific category and its products when navigated from Home
  private loadSpecificCategory(categoryId: string): void {
    // Find the category in our list
    const category = this.categoriesList.find((cat) => cat._id === categoryId);
    if (category) {
      this.onCategorySelect(category);
    } else {
      // If categories aren't loaded yet, wait for them
      this.categoriesService.getCategories().subscribe({
        next: (response) => {
          this.categoriesList = response.data || response;
          const foundCategory = this.categoriesList.find(
            (cat) => cat._id === categoryId
          );
          if (foundCategory) {
            this.onCategorySelect(foundCategory);
          }
        },
      });
    }
  }

  // Handle category selection and load products for selected category
  onCategorySelect(category: Category): void {
    this.selectedCategory = category;
    this.productsList = [];
    this.isLoadingProducts = true;
    this.productsError = '';

    this.productsService.getProductsByCategory(category._id).subscribe({
      next: (response) => {
        this.productsList = response.data || response;
        this.isLoadingProducts = false;
      },
      error: (error) => {
        console.error('Error loading products for category:', error);
        this.productsError =
          'Failed to load products for this category. Please try again.';
        this.isLoadingProducts = false;
      },
    });
  }

  // Clear selection and show all categories
  clearSelection(): void {
    this.selectedCategory = null;
    this.productsList = [];
    this.productsError = '';
  }

  // Navigate to product details
  navigateToProduct(productId: string): void {
    this.router.navigate(['/details', productId]);
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
