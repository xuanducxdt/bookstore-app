import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { AddNewCartData, CartService } from 'src/app/services/cart/cart.service';
import { IBook } from '../books/books.component';
import { SuccessToastComponent } from '../success-toast/success-toast.component';
import { ToastType } from '../toast-message/toast-message.component';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  bookId: string = '';
  totalAmount: number = 0;
  bookDetail: IBook | null = null;
  addCartButtonName: string = 'Add Cart';
  isSpinner: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isSpinner = true;
      if (params['id']) {
          this.bookId = params['id'];
          this.bookService.getBook(this.bookId).subscribe((response) => {
            this.bookDetail = response.data;
            this.isSpinner = false;
            console.log(response.data)
          });
      }
    });
  }

  onChangeQuantity(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    const newQuantityValue = Number(eventTarget && eventTarget.value);
    if (newQuantityValue && this.bookDetail) {
      if (newQuantityValue > this.bookDetail.quantity) {
        this.totalAmount = this.bookDetail.quantity;
      } else if (newQuantityValue < 0) {
        this.totalAmount = 0;
      } else {
        this.totalAmount = newQuantityValue;
      }
    }
  }

  onIncreaseQuantity(): void {
    if (this.bookDetail) {
      const newQuantityValue = this.totalAmount + 1;
      if (newQuantityValue <= this.bookDetail.quantity) {
        this.totalAmount = newQuantityValue;
      }
    }
  }

  onDecreaseQuantity(): void {
    const newQuantityValue = this.totalAmount - 1;
    if (newQuantityValue >= 0) {
      this.totalAmount = newQuantityValue;
    }
  }

  openSnackBar(duration: number = 3000, message: string, type: ToastType) {
    this._snackBar.openFromComponent(SuccessToastComponent, {
      duration,
      panelClass: [`${type}-snackbar`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: {
        message
      }
    });
  }

  addCart(): void {
    if(this.bookDetail) {
      const newCartData: AddNewCartData = {
        totalAmount: this.totalAmount,
        book: this.bookDetail?._id
      }
      this.cartService.createCart(newCartData).subscribe((response) => {
        if (response.message === 'Success') {
          this.openSnackBar(3000, 'Add cart success!', 'success');
        }
      },
      (error) => {
        const message = error.error.error ? error.error.error : 'An error has occurred!';
        this.openSnackBar(3000, message, 'error');
      });
    }
  }
}
