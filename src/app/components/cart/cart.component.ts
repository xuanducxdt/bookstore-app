import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Category, IBook } from '../books/books.component';

export interface ICart {
  _id: string;
  book: IBook;
  owner?: string;
  totalAmount: number;
  isPaid?: boolean;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: ICart[] = [];
  displayedColumns: string[] = ['book', 'total-amount', 'price', 'action']
  isSpinner: boolean = true;
  totalPayment: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.isSpinner = true;
    this.cartService.getCarts().subscribe((response) => {
      this.carts = response.data;
      this.isSpinner = false;
      this.carts.forEach((cart: ICart) => {
        this.totalPayment += (cart.book.price * cart.totalAmount);
      })
    });
  }

}
