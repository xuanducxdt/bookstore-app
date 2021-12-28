import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AddBookActionType, AddBookFormDialogComponent } from '../add-book-form-dialog/add-book-form-dialog.component';
import { ToastMessageComponent, ToastType } from '../toast-message/toast-message.component';

export type Category = 'drama' | 'comedy' | 'sport';

export interface AddBookDialogData {
  formData?: FormData;
  action: AddBookActionType;
}

export interface IBook {
  _id: string;
  title: string;
  image: string;
  category: Category;
  quantity: number;
  price: number;
  description: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  limit: number = 10;
  skip: number = 0;
  totalBooks: number = 0;
  books: IBook[] = [];
  isSpinner: boolean = true;
  isAdmin: boolean = false;
  cartCount: number = 0;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((res) => {
      this.cartCount = res.data.length
    });
    this.getBooks();
    const role = this.authService.getCookie('role');
    if (role === 'admin') this.isAdmin = true;
  }

  getBooks(): void {
    this.isSpinner = true;
    this.bookService.getBooks().subscribe((response) => {
      console.log({ response })
      this.books = response.data;
      this.isSpinner = false;
      this.totalBooks = response.count ? response.count : 0;
    });
  }

  openDialog() {
    // this.dialog.open(AddBookFormDialogComponent);
    const dialogRef = this.dialog.open(AddBookFormDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((data: AddBookDialogData) => {
      if (data && data.action === 'save' && data.formData) {
        this.addBook(data.formData);
      }
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

  addBook(formData: FormData): void {
    this.bookService.createBook(formData).subscribe((response) => {
      if (response.message === 'Success') {
        this.openSnackBar(3000, 'Add new book success!', 'success');
        this.cartService.setCartCount({ cartCount: this.cartCount + 1 });
        this.getBooks();
      }
    },
    (error) => {
      const message = error.error.error ? error.error.error : 'An error has occurred!';
      this.openSnackBar(3000, message, 'error');
    });
  }

}
