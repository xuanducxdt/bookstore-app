import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book/book.service';
import { Category, IBook } from '../books/books.component';
import { ErrorConfig } from '../field-error-display/field-error-display.component';
import { SuccessToastComponent } from '../success-toast/success-toast.component';
import { ToastType } from '../toast-message/toast-message.component';

export interface CategoryData {
  key: Category,
  value: string;
}

export type AddBookActionType = 'save' | 'close';

@Component({
  selector: 'app-add-book-form-dialog',
  templateUrl: './add-book-form-dialog.component.html',
  styleUrls: ['./add-book-form-dialog.component.scss']
})
export class AddBookFormDialogComponent implements OnInit {

  addBookForm: FormGroup = new FormGroup({
    image: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required])
  });

  imageSrc: string | ArrayBuffer | null = 'https://via.placeholder.com/150/673ab7/FFFFFF?text=Book%20Image'
  categories: CategoryData[] = [
    {
      key: 'drama',
      value: 'Drama'
    },
    {
      key: 'comedy',
      value: 'Comedy'
    },
    {
      key: 'sport',
      value: 'Sport'
    }
  ];
  titleErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Title is required.'
    },
    {
      name: 'maxlength',
      message: 'Title length should not exceed 30 characters.'
    }
  ];
  categoryErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Category is required.'
    }
  ];
  quantityErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Quantity is required.'
    },
    {
      name: 'min',
      message: 'Quantity must be greater than or equal to 1.'
    }
  ];
  priceErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Price is required.'
    },
    {
      name: 'min',
      message: 'Quantity must be greater than or equal to 1.'
    }
  ];
  descriptionErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Description is required.'
    }
  ];

  constructor(
    private dialogRef: MatDialogRef<AddBookFormDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onSave(): void {
    const formData = new FormData();
    formData.append('image', this.addBookForm.controls['image'].value);
    formData.append('title', this.addBookForm.controls['title'].value);
    formData.append('category', this.addBookForm.controls['category'].value);
    formData.append('price', this.addBookForm.controls['price'].value);
    formData.append('quantity', this.addBookForm.controls['quantity'].value);
    formData.append('description', this.addBookForm.controls['description'].value);

    const data: {
      formData: FormData,
      action: AddBookActionType
    } = {
      formData,
      action: 'save'
    };
    this.dialogRef.close(data);
  }

  onImageSelect(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget && eventTarget.files && eventTarget.files.length > 0) {
      const file = eventTarget.files[0];
      if (file) {
        this.addBookForm.controls['image'].setValue(file);
        // const reader = new FileReader();
        // reader.onload = () => this.imageSrc = reader.result;
        // reader.readAsDataURL(file);
      }
    }
  }

}
