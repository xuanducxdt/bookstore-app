import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';
import { ICart } from 'src/app/components/cart/cart.component';
import { AuthService } from '../auth/auth.service';
import { ICommonResponse } from '../book/book.service';

export interface ICartsResponse {
  message: string;
  data: ICart[]
}
export interface ICartDetailResponse {
  message: string;
  data: ICart
}

export interface AddNewCartData {
  totalAmount: number;
  book: string;
}

export interface UpdatedCartData {
  totalAmount?: number;
  cart: string;
}

export interface ICartCount {
  cartCount: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartApiUrl: string = `${GlobalConstants.apiUrl}/api/cart`
  private cartCount = new BehaviorSubject<ICartCount>({
    cartCount: 0
  });
  private cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getCarts(): Observable<ICartsResponse> {
    return this.http.get<ICartsResponse>(this.cartApiUrl, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  getCartCount(): Observable<ICartCount> {
    return this.cartCount$;
  }
  setCartCount(latestValue: ICartCount): void {
    this.cartCount.next(latestValue);
  }
  getCart(cartId: string): Observable<ICartDetailResponse> {
    return this.http.get<ICartDetailResponse>(`${this.cartApiUrl}/${cartId}`, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  createCart(newCartData: AddNewCartData): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.cartApiUrl, newCartData, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  updateCart(updatedCartData: UpdatedCartData): Observable<ICartDetailResponse> {
    return this.http.put<ICartDetailResponse>(`${this.cartApiUrl}/${updatedCartData.cart}`, {
      totalAmount: updatedCartData.totalAmount
    }, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  deleteCart(updateCartData: UpdatedCartData): Observable<ICommonResponse> {
    return this.http.delete<ICommonResponse>(`${this.cartApiUrl}/${updateCartData.cart}`, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
}
