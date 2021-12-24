import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

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
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: IBook[] = [];
  isSpinner: boolean = true;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.isSpinner = true;
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
      this.isSpinner = false;
    });
  }

}
