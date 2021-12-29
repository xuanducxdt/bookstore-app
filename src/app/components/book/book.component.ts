import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { AddNewCartData, CartService } from 'src/app/services/cart/cart.service';
import { IBook } from '../books/books.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastMessageComponent, ToastType } from '../toast-message/toast-message.component';
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
  isAdmin: boolean = false;
  cartCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private cartService: CartService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isSpinner = true;
      if (params['id']) {
          this.bookId = params['id'];
          this.bookService.getBook(this.bookId).subscribe((response) => {
            this.bookDetail = response.data;
            this.isSpinner = false;
          });
      }
    });
    this.cartService.getCartCount().subscribe((data) => {
      this.cartCount = data.cartCount;
    });
    const role = this.authService.getCookie('role');
    if (role === 'admin') this.isAdmin = true;
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
    this._snackBar.openFromComponent(ToastMessageComponent, {
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
      this.cartService.createCart(newCartData).subscribe({
        next: (response) => {
          if (response.message === 'Success') {
            this.openSnackBar(1500, 'Add cart success!', 'success');
            this.cartService.setCartCount({ cartCount: this.cartCount + 1 });
          }
        },
        error: (error) => {
          const message = error.error.error ? error.error.error : 'An error has occurred!';
          this.openSnackBar(1500, message, 'error');
        }
      });
    }
  }

  openConfirmationDialog(book: IBook) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: {
        top: '100px'
      },
      data: {
        book: book._id
      }
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.bookService.deleteBook(data).subscribe((response) => {
          if (response.message === 'Success') {
            this.router.navigate(['/']);
            this.openSnackBar(1500, 'Delete book success!', 'success');
          }
        });
      }
    },
    (error) => {
      const message = error.error.error ? error.error.error : 'An error has occurred!';
      this.openSnackBar(1500, message, 'error');
    });
  }
}
