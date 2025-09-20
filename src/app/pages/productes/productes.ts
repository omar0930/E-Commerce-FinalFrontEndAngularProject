import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../../core/services/products';
import { Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Cart as CartService } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productes',
  imports: [RouterLink, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './productes.html',
  styleUrl: './productes.css',
})
export class Productes implements OnInit {
  private readonly products = inject(Products);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productsList: Product[] = [];

  Text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getProducts();
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

  getProducts(pageNumber: number = 1): void {
    this.products.getProducts(pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.productsList = res.data;

        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
