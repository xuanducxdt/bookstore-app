import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CartService, UpdatedCartData } from 'src/app/services/cart/cart.service';
import { IBook } from '../books/books.component';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastMessageComponent, ToastType } from '../toast-message/toast-message.component';

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
export class CartComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  subject: Subject<UpdatedCartData> = new Subject();
  carts: ICart[] = [];
  displayedColumns: string[] = ['book', 'total-amount', 'price', 'action']
  isSpinner: boolean = true;
  totalPayment: number = 0;
  totalAmount: {
    [key: string]: number
  } = {};

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.subscription.add(this.subject.pipe(debounceTime(1200)).subscribe((updatedCartData: UpdatedCartData) => {
      this.cartService.updateCart(updatedCartData).subscribe((response) => {
        if (response.message === 'Success') {
          this.getCarts();
        }
      });
    }));
  }

  ngOnInit(): void {
    this.getCarts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCarts(): void {
    this.isSpinner = true;
    this.cartService.getCarts().subscribe((response) => {
      this.carts = response.data;
      this.isSpinner = false;
      this.totalPayment = 0;
      this.carts.forEach((cart: ICart) => {
        this.totalAmount[cart._id] = cart.totalAmount;
        this.totalPayment += (cart.book.price * cart.totalAmount);
      })
    });
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

  openConfirmationDialog(cart: ICart) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: {
        top: '100px'
      },
      data: {
        cart: cart._id
      }
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.cartService.deleteCart(data).subscribe((response) => {
          if (response.message === 'Success') {
            this.getCarts();
            this.cartService.setCartCount({ cartCount: this.carts.length - 1 })
            this.openSnackBar(1500, 'Delete cart success!', 'success');
          }
        });
      }
    },
    (error) => {
      const message = error.error.error ? error.error.error : 'An error has occurred!';
      this.openSnackBar(1500, message, 'error');
    });
  }

  onChangeQuantity(event: Event, cart: ICart): void {
    const eventTarget = event.target as HTMLInputElement;
    const newQuantityValue = Number(eventTarget && eventTarget.value);
    if (newQuantityValue || newQuantityValue === 0) {
      if (newQuantityValue > cart.book.quantity) {
        this.totalAmount[cart._id] = cart.book.quantity;
      } else if (newQuantityValue < 1) {
        this.totalAmount[cart._id] = 1;
      } else {
        this.totalAmount[cart._id] = newQuantityValue;
      }
      const updateCartData = {
        cart: cart._id,
        totalAmount: this.totalAmount[cart._id]
      };
      this.subject.next(updateCartData);
    }
  }

  onIncreaseQuantity(cart: ICart): void {
    const newQuantityValue = this.totalAmount[cart._id] + 1;
    if (newQuantityValue <= cart.book.quantity) {
      this.totalAmount[cart._id] = newQuantityValue;
    }
    const updateCartData = {
      cart: cart._id,
      totalAmount: this.totalAmount[cart._id]
    };
    this.subject.next(updateCartData);
  }

  onDecreaseQuantity(cart: ICart): void {
    const newQuantityValue = this.totalAmount[cart._id] - 1;
    if (newQuantityValue >= 1) {
      this.totalAmount[cart._id] = newQuantityValue;
    }
    const updateCartData = {
      cart: cart._id,
      totalAmount: this.totalAmount[cart._id]
    };
    this.subject.next(updateCartData);
  }

  onDeleteCart(): void {

  }

}
