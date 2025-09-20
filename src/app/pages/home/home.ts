import { Component, OnInit } from '@angular/core';
import { Products } from '../../core/services/products';
import { Product } from '../../core/interfaces/product';
import { Categories } from '../../core/services/categories';
import { Category } from '../../core/interfaces/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { OnSalePipe } from '../../shared/pipes/on-sale-pipe';
import { TermPipe } from '../../shared/pipes/term-pipe';
import { Cart as CartService } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, TitleCasePipe, TermPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  productsList: Product[] = [];
  categoriesList: Category[] = [];

  constructor(
    private products: Products,
    private category: Categories,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.products.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this.category.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
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

  // make categories clickable - navigate to category page with selected category
  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/category'], {
      queryParams: { categoryId: categoryId },
    });
  }

  //slider owl - categories slider with arrows
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  //static slider header page - hero slider with dots
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 800,
  };
}
