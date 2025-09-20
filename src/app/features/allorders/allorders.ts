import { Component, OnInit, inject } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  TitleCasePipe,
} from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../../core/services/auth';

interface OrderItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

interface Order {
  _id: string;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  totalOrderPrice: number;
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethodType: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

@Component({
  selector: 'app-allorders',
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css',
})
export class Allorders implements OnInit {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly authService = inject(Auth);

  orders: Order[] = [];
  isLoading = true;
  userId: string = '';

  ngOnInit(): void {
    this.getUserId();
    this.loadOrders();
  }

  private getUserId(): void {
    try {
      const decodedToken: any = this.authService.decodeToken();
      this.userId = decodedToken?.id || '6407cf6f515bdcf347c09f17'; // fallback ID if needed
    } catch (error) {
      console.error('Error decoding token:', error);
      this.userId = '6407cf6f515bdcf347c09f17'; // fallback ID
    }
  }

  private loadOrders(): void {
    const headers = {
      headers: { token: this.cookieService.get('token') },
    };

    // First try getUserOrders, then fallback to getAllOrders
    this.httpClient
      .get<any>(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${this.userId}`,
        headers
      )
      .subscribe({
        next: (response) => {
          this.orders = response.data || response || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading user orders, trying all orders:', error);
          // Fallback to all orders
          this.httpClient
            .get<any>('https://ecommerce.routemisr.com/api/v1/orders/', headers)
            .subscribe({
              next: (response) => {
                this.orders = response.data || response || [];
                this.isLoading = false;
              },
              error: (error) => {
                console.error('Error loading all orders:', error);
                this.orders = [];
                this.isLoading = false;
              },
            });
        },
      });
  }

  getOrderStatus(order: Order): string {
    if (order.isDelivered) return 'completed';
    if (order.isPaid) return 'processing';
    return 'pending';
  }

  getOrderStatusClass(order: Order): string {
    const status = this.getOrderStatus(order);
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  }

  getPaymentMethodClass(order: Order): string {
    if (order.paymentMethodType === 'card') {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-green-100 text-green-800';
  }
}
