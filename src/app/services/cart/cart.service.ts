import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';
import { ICart } from 'src/app/components/cart/cart.component';
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

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartApiUrl: string = `${GlobalConstants.apiUrl}/api/cart`
  private cartId: string = '61c44215e0ae9c56ceb25b31';
  private headers = {
    'x-access-token': GlobalConstants.token
  }

  constructor(private http: HttpClient) { }

  getCarts(): Observable<ICartsResponse> {
    return this.http.get<ICartsResponse>(this.cartApiUrl, {
      headers: this.headers
    });
  }
  getCart(cartId: string): Observable<ICartDetailResponse> {
    return this.http.get<ICartDetailResponse>(`${this.cartApiUrl}/${cartId}`, {
      headers: this.headers
    });
  }
  createCart(newCartData: AddNewCartData): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.cartApiUrl, newCartData, {
      headers: this.headers
    });
  }
  updateCart(updatedCartData: UpdatedCartData): Observable<ICartDetailResponse> {
    return this.http.put<ICartDetailResponse>(`${this.cartApiUrl}/${updatedCartData.cart}`, {
      totalAmount: updatedCartData.totalAmount
    }, {
      headers: this.headers
    });
  }
  deleteCart(updateCartData: UpdatedCartData): Observable<ICommonResponse> {
    return this.http.delete<ICommonResponse>(`${this.cartApiUrl}/${updateCartData.cart}`, {
      headers: this.headers
    });
  }
}
