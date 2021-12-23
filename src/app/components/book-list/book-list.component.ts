import { Component, OnInit } from '@angular/core';

export type Category = 'drama' | 'comedy' | 'sport';

export interface IBook {
  title: string;
  category: Category;
  price: number;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Array<IBook> = [{
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    category: 'comedy',
    price: 80000
  }, {
    title: 'Mắt biếc',
    category: 'comedy',
    price: 80000
  }, {
    title: 'Chuyện con mèo dạy hải âu bay',
    category: 'comedy',
    price: 80000
  }, {
    title: '70 độ thể thao',
    category: 'sport',
    price: 80000
  }, {
    title: 'Mây họa ánh trăng',
    category: 'drama',
    price: 80000
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
