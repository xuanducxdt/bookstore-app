import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit {
  message: string = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) { }

  ngOnInit(): void {
    this.message = this.data.message;
  }

}
