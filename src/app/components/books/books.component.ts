import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book/book.service';
import { AddBookActionType, AddBookFormDialogComponent } from '../add-book-form-dialog/add-book-form-dialog.component';
import { SuccessToastComponent } from '../success-toast/success-toast.component';
import { ToastType } from '../toast-message/toast-message.component';

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

  books: IBook[] = [];
  isSpinner: boolean = true;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.isSpinner = true;
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
      this.isSpinner = false;
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

  addBook(formData: FormData): void {
    this.bookService.createBook(formData).subscribe((response) => {
      if (response.message === 'Success') {
        this.openSnackBar(3000, 'Add new book success!', 'success');
        this.getBooks();
      }
    },
    (error) => {
      const message = error.error.error ? error.error.error : 'An error has occurred!';
      this.openSnackBar(3000, message, 'error');
    });
  }

}
