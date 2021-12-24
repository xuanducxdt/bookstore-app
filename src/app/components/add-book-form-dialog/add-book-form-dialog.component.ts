import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBook } from '../books/books.component';

@Component({
  selector: 'app-add-book-form-dialog',
  templateUrl: './add-book-form-dialog.component.html',
  styleUrls: ['./add-book-form-dialog.component.scss']
})
export class AddBookFormDialogComponent implements OnInit {

  addBookForm: FormGroup = new FormGroup({
    image: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  imageSrc: string | ArrayBuffer | null = 'https://via.placeholder.com/150/673ab7/FFFFFF?text=Book%20Image'

  constructor() { }

  ngOnInit(): void {
  }

  addBook(book: IBook): void {
    console.log({ book });
    // this.userService.signIn(user).subscribe((response) => {
    //   console.log({ response });
    // });
  }

  onImageSelect(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget && eventTarget.files && eventTarget.files.length > 0) {
      const file = eventTarget.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
      }
    }
  }

}
