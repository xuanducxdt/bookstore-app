import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { IBook } from '../books/books.component';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  bookId: string = '';
  bookDetail: IBook | null = null;
  addCartButtonName: string = 'Add Cart';
  isSpinner: boolean = true;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isSpinner = true;
      console.log(params['id'])
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
}
