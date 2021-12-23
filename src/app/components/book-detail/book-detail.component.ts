import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { IBook } from '../book-list/book-list.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  bookId: string = '';
  bookDetail: IBook = {
    _id: '1',
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    image: 'image1',
    category: 'comedy',
    quantity: 5,
    price: 80000,
    description: 'This is ... 1'
  };
  addCartButtonName: string = 'Thêm vào giỏ hàng';

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   console.log(params['id'])
    //   if (params['id']) {
    //       this.bookId = params['id'];
    //       this.bookService.getBook(this.bookId).subscribe((response) => {
    //         this.bookDetail = response.data;
    //         console.log(response.data)
    //       });
    //   }
    // });
  }
}
