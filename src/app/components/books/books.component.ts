import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book/book.service';
import { AddBookFormDialogComponent } from '../add-book-form-dialog/add-book-form-dialog.component';

export type Category = 'drama' | 'comedy' | 'sport';

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

  constructor(private bookService: BookService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isSpinner = true;
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
      this.isSpinner = false;
    });
  }

  openDialog() {
    this.dialog.open(AddBookFormDialogComponent);
  }

}
